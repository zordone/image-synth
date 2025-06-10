import React, { useState, useCallback, useRef, useEffect } from "react";
import { DndContext, useSensor, useSensors, MouseSensor } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import type { ModuleValue } from "../types/module";
import { useSnapshot } from "valtio";
import { state, actions, subscribeWithStorage } from "../store";
import { moduleRegistry } from "../modules";
import { BaseModule } from "./BaseModule";
import { calculateModuleInputs } from "../utils/renderer";
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
import { renderToCanvas } from "../utils/renderer";

interface Point {
  x: number;
  y: number;
}

interface PortPosition {
  x: number;
  y: number;
  side: "input" | "output";
}

interface ConnectionInfo {
  moduleId: string;
  portName: string;
  isInput: boolean;
  type?: string;
}

export const App: React.FC = () => {
  // Initialize localStorage subscription
  useEffect(() => {
    const unsubscribe = subscribeWithStorage();
    return () => unsubscribe();
  }, []);

  const snap = useSnapshot(state);
  const [connectionStart, setConnectionStart] = useState<ConnectionInfo | null>(
    null
  );
  const [portPositions, setPortPositions] = useState<
    Record<string, PortPosition>
  >({});
  const [tempConnection, setTempConnection] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const moduleAreaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevLastUpdatedRef = useRef<number | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const calculatePortPosition = useCallback(
    (moduleId: string, portName: string, isInput: boolean): PortPosition => {
      const module = snap.moduleMap.get(moduleId);
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
    [snap.moduleMap]
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

  const validateConnection = useCallback(
    (
      fromModuleId: string,
      fromOutputName: string,
      toModuleId: string,
      toInputName: string
    ): boolean => {
      const fromModule = snap.moduleMap.get(fromModuleId);
      const toModule = snap.moduleMap.get(toModuleId);
      if (!fromModule || !toModule) return false;

      const fromDefinition = snap.definitionMap.get(fromModule.definitionId);
      const toDefinition = snap.definitionMap.get(toModule.definitionId);
      if (!fromDefinition || !toDefinition) return false;

      const outputDef = fromDefinition.outputs.find(
        (o) => o.name === fromOutputName
      );
      const inputDef = toDefinition.inputs.find((i) => i.name === toInputName);
      if (!outputDef || !inputDef) return false;

      // Validate types match
      return outputDef.type === inputDef.type;
    },
    [snap.moduleMap, snap.definitionMap]
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

          // Validate connection types
          if (!validateConnection(fromId, fromPort, toId, toPort)) {
            console.error("Invalid connection: Types don't match");
            setConnectionStart(null);
            setTempConnection(null);
            return;
          }

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
        const module = snap.moduleMap.get(moduleId);
        if (!module) return;

        const definition = snap.definitionMap.get(module.definitionId);
        if (!definition) return;

        // Get the port type
        const port = isInput
          ? definition.inputs.find((i) => i.name === portName)
          : definition.outputs.find((o) => o.name === portName);

        if (!port) return;

        setConnectionStart({ moduleId, portName, isInput, type: port.type });
        updateAllPortPositions();
      }
    },
    [
      connectionStart,
      updateAllPortPositions,
      validateConnection,
      snap.moduleMap,
      snap.definitionMap,
    ]
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

      if (definitionId === "output" && snap.moduleMap.has("output")) {
        return; // Prevent adding multiple output modules
      }

      const parameters: Record<string, ModuleValue> = {};
      definition.parameters.forEach((param) => {
        if (param.default !== undefined) {
          parameters[param.name] = param.default;
        }
      });

      actions.addModule({
        id:
          definitionId === "output"
            ? "output"
            : `${definitionId}-${Date.now()}`,
        definitionId,
        position: { x: 100, y: 100 },
        parameters,
      });

      // Update port positions after adding a module
      requestAnimationFrame(updateAllPortPositions);
    },
    [snap.moduleMap, updateAllPortPositions]
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

  // Update canvas when modules, connections, or parameters change
  useEffect(() => {
    // Skip if lastUpdated hasn't changed (only positions were updated)
    if (prevLastUpdatedRef.current === snap.lastUpdated) {
      return;
    }

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = 200;
      canvas.height = 200;
      requestAnimationFrame(() => {
        renderToCanvas(canvas, {
          modules: snap.modules,
          connections: snap.connections,
          moduleMap: snap.moduleMap,
          connectionsByInput: snap.connectionsByInput,
          definitionMap: snap.definitionMap,
        });
      });
    }

    // Update the previous value
    prevLastUpdatedRef.current = snap.lastUpdated;
  }, [
    snap.lastUpdated,
    snap.modules,
    snap.connections,
    snap.moduleMap,
    snap.connectionsByInput,
    snap.definitionMap,
  ]);

  // Calculate inputs for each module
  const moduleInputs = React.useMemo(() => {
    const inputs: Record<string, Record<string, ModuleValue>> = {};
    snap.modules.forEach((module) => {
      inputs[module.id] = calculateModuleInputs(module.id, {
        modules: snap.modules,
        connections: snap.connections,
        moduleMap: snap.moduleMap,
        connectionsByInput: snap.connectionsByInput,
        definitionMap: snap.definitionMap,
      });
    });
    return inputs;
  }, [
    snap.modules,
    snap.connections,
    snap.moduleMap,
    snap.connectionsByInput,
    snap.definitionMap,
  ]);

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

              // Validate connection types
              const isValid = validateConnection(
                connection.fromModuleId,
                connection.fromOutputName,
                connection.toModuleId,
                connection.toInputName
              );

              return (
                <ConnectionPath
                  key={connection.id}
                  d={createConnectionPath(fromPos, toPos)}
                  onClick={() => handleRemoveConnection(connection.id)}
                  $isError={!isValid}
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
            const definition = snap.definitionMap.get(module.definitionId);
            if (!definition) return null;

            return (
              <BaseModule
                key={module.id}
                id={module.id}
                definition={definition}
                position={module.position}
                parameters={module.parameters}
                inputs={moduleInputs[module.id]}
                onParameterChange={(name, value) =>
                  actions.updateModuleParameter(module.id, name, value)
                }
                onStartConnectionFrom={handleStartConnection}
                onDelete={actions.removeModule}
              />
            );
          })}
        </ModuleArea>

        <RightPanel>
          <CanvasOutput ref={canvasRef} />
        </RightPanel>
      </Workspace>
    </DndContext>
  );
};
