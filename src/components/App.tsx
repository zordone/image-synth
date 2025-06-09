import React, { useState, useCallback, useRef, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import type { ModuleValue } from "../types/module";
import { useSnapshot } from "valtio";
import { state, actions } from "../store";
import { moduleRegistry } from "../modules";
import { BaseModule } from "./BaseModule";
import {
  Workspace,
  LeftPanel,
  RightPanel,
  ModuleArea,
  ModuleMenuButton,
  CanvasOutput,
  ConnectionsOverlay,
  ConnectionPath,
  TemporaryConnectionPath,
} from "./styled";

interface Point {
  x: number;
  y: number;
}

interface PortPosition {
  x: number;
  y: number;
  side: "input" | "output";
}

export const App: React.FC = () => {
  const snap = useSnapshot(state);
  const [connectionStart, setConnectionStart] = useState<{
    moduleId: string;
    portName: string;
    isInput: boolean;
  } | null>(null);
  const [portPositions, setPortPositions] = useState<
    Record<string, PortPosition>
  >({});
  const [tempConnection, setTempConnection] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const moduleAreaRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const calculatePortPosition = useCallback(
    (moduleId: string, portName: string, isInput: boolean): PortPosition => {
      const module = snap.modules.find((m) => m.id === moduleId);
      if (!module) return { x: 0, y: 0, side: "input" };

      const moduleRect = document
        .getElementById(`module-${moduleId}`)
        ?.getBoundingClientRect();
      const portRect = document
        .getElementById(`port-${moduleId}-${portName}`)
        ?.getBoundingClientRect();
      const moduleAreaRect = moduleAreaRef.current?.getBoundingClientRect();

      if (!moduleRect || !portRect || !moduleAreaRect) {
        return { x: 0, y: 0, side: isInput ? "input" : "output" };
      }

      return {
        x: portRect.left + portRect.width / 2 - moduleAreaRect.left,
        y: portRect.top + portRect.height / 2 - moduleAreaRect.top,
        side: isInput ? "input" : "output",
      };
    },
    [snap.modules]
  );

  const updateAllPortPositions = useCallback(() => {
    const newPositions: Record<string, PortPosition> = {};
    snap.modules.forEach((module) => {
      const definition = moduleRegistry.find(
        (m) => m.id === module.definitionId
      );
      if (!definition) return;

      definition.inputs.forEach((input) => {
        const key = `${module.id}-${input.name}-input`;
        newPositions[key] = calculatePortPosition(module.id, input.name, true);
      });

      definition.outputs.forEach((output) => {
        const key = `${module.id}-${output.name}-output`;
        newPositions[key] = calculatePortPosition(
          module.id,
          output.name,
          false
        );
      });
    });

    setPortPositions(newPositions);
  }, [calculatePortPosition, snap.modules]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, delta } = event;
      const moduleId = active.id as string;
      const module = snap.modules.find((m) => m.id === moduleId);

      if (module) {
        actions.updateModulePosition(
          moduleId,
          module.position.x + delta.x,
          module.position.y + delta.y
        );
        // Update port positions after module movement
        requestAnimationFrame(updateAllPortPositions);
      }
    },
    [snap.modules, updateAllPortPositions]
  );

  const handleStartConnection = useCallback(
    (moduleId: string, portName: string, isInput: boolean) => {
      if (connectionStart) {
        // Complete connection
        if (connectionStart.isInput !== isInput) {
          const [fromId, fromPort, toId, toPort] = connectionStart.isInput
            ? [
                moduleId,
                portName,
                connectionStart.moduleId,
                connectionStart.portName,
              ]
            : [
                connectionStart.moduleId,
                connectionStart.portName,
                moduleId,
                portName,
              ];

          actions.addConnection({
            id: `${fromId}-${fromPort}-${toId}-${toPort}`,
            fromModuleId: fromId,
            fromOutputName: fromPort,
            toModuleId: toId,
            toInputName: toPort,
          });
        }
        setConnectionStart(null);
        setTempConnection(null);
      } else {
        // Start new connection
        setConnectionStart({ moduleId, portName, isInput });
        // Update port positions when starting a connection
        updateAllPortPositions();
      }
    },
    [connectionStart, updateAllPortPositions]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (connectionStart && moduleAreaRef.current) {
        const rect = moduleAreaRef.current.getBoundingClientRect();
        setTempConnection({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    },
    [connectionStart]
  );

  const createConnectionPath = useCallback((start: Point, end: Point) => {
    const dx = end.x - start.x;
    const controlPointOffset = Math.min(Math.abs(dx) * 0.5, 100);
    return `M ${start.x},${start.y} C ${start.x + controlPointOffset},${
      start.y
    } ${end.x - controlPointOffset},${end.y} ${end.x},${end.y}`;
  }, []);

  const addModule = useCallback(
    (definitionId: string) => {
      const definition = moduleRegistry.find((m) => m.id === definitionId);
      if (!definition) return;

      const parameters: Record<string, ModuleValue> = {};
      definition.parameters.forEach((param) => {
        if (param.default !== undefined) {
          parameters[param.name] = param.default;
        }
      });

      actions.addModule({
        id: `${definitionId}-${Date.now()}`,
        definitionId,
        position: { x: 100, y: 100 },
        parameters,
      });

      // Update port positions after adding a module
      requestAnimationFrame(updateAllPortPositions);
    },
    [updateAllPortPositions]
  );

  // Add mutation observer to detect DOM changes that might affect port positions
  useEffect(() => {
    const observer = new MutationObserver(updateAllPortPositions);
    if (moduleAreaRef.current) {
      observer.observe(moduleAreaRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style"],
      });
    }
    return () => observer.disconnect();
  }, [updateAllPortPositions]);

  // Monitor DOM resize events
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateAllPortPositions();
    });

    if (moduleAreaRef.current) {
      observer.observe(moduleAreaRef.current);
      document.querySelectorAll('[id^="module-"]').forEach((el) => {
        observer.observe(el);
      });
    }

    return () => observer.disconnect();
  }, [updateAllPortPositions]);

  const handleRemoveConnection = useCallback((connectionId: string) => {
    actions.removeConnection(connectionId);
  }, []);

  const handleBackgroundClick = useCallback(
    (e: React.MouseEvent) => {
      // Only cancel if clicking directly on the ModuleArea, not on a module or connection
      if (e.target === e.currentTarget && connectionStart) {
        setConnectionStart(null);
        setTempConnection(null);
      }
    },
    [connectionStart]
  );

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <Workspace>
        <LeftPanel>
          {moduleRegistry.map((module) => (
            <ModuleMenuButton
              key={module.id}
              onClick={() => addModule(module.id)}
            >
              {module.name}
            </ModuleMenuButton>
          ))}
        </LeftPanel>

        <ModuleArea
          ref={moduleAreaRef}
          onMouseMove={handleMouseMove}
          onClick={handleBackgroundClick}
        >
          <ConnectionsOverlay>
            {snap.connections.map((connection) => {
              const fromPos =
                portPositions[
                  `${connection.fromModuleId}-${connection.fromOutputName}-output`
                ];
              const toPos =
                portPositions[
                  `${connection.toModuleId}-${connection.toInputName}-input`
                ];
              if (!fromPos || !toPos) return null;

              return (
                <ConnectionPath
                  key={connection.id}
                  d={createConnectionPath(fromPos, toPos)}
                  onClick={() => handleRemoveConnection(connection.id)}
                />
              );
            })}
            {connectionStart && tempConnection && (
              <TemporaryConnectionPath
                d={createConnectionPath(
                  // If starting from an input, use mouse position as start and port position as end
                  connectionStart.isInput
                    ? tempConnection
                    : portPositions[
                        `${connectionStart.moduleId}-${connectionStart.portName}-output`
                      ] || tempConnection,
                  // If starting from an output, use mouse position as end and port position as start
                  connectionStart.isInput
                    ? portPositions[
                        `${connectionStart.moduleId}-${connectionStart.portName}-input`
                      ] || tempConnection
                    : tempConnection
                )}
              />
            )}
          </ConnectionsOverlay>

          {snap.modules.map((module) => {
            const definition = moduleRegistry.find(
              (m) => m.id === module.definitionId
            );
            if (!definition) return null;

            return (
              <BaseModule
                key={module.id}
                id={module.id}
                definition={definition}
                position={module.position}
                parameters={module.parameters}
                onParameterChange={(name, value) =>
                  actions.updateModuleParameter(module.id, name, value)
                }
                onStartConnectionFrom={handleStartConnection}
              />
            );
          })}
        </ModuleArea>

        <RightPanel>
          <CanvasOutput width={200} height={200} />
        </RightPanel>
      </Workspace>
    </DndContext>
  );
};
