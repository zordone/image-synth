import React, { useState } from "react";
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
} from "./styled";

export const App: React.FC = () => {
  const snap = useSnapshot(state);
  const [connectionStart, setConnectionStart] = useState<{
    moduleId: string;
    portName: string;
    isInput: boolean;
  } | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const moduleId = active.id as string;
    const module = snap.modules.find((m) => m.id === moduleId);

    if (module) {
      actions.updateModulePosition(
        moduleId,
        module.position.x + delta.x,
        module.position.y + delta.y
      );
    }
  };

  const handleStartConnection = (
    moduleId: string,
    portName: string,
    isInput: boolean
  ) => {
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
    } else {
      // Start new connection
      setConnectionStart({ moduleId, portName, isInput });
    }
  };

  const addModule = (definitionId: string) => {
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
  };

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

        <ModuleArea>
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
