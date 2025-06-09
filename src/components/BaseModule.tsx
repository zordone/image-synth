import React from "react";
import { useDraggable } from "@dnd-kit/core";
import type { ModuleDefinition, ModuleValue } from "../types/module";
import {
  ModuleContainer,
  ModuleHeader,
  ModuleBody,
  PortsContainer,
  PortRow,
  Port,
  PortLabel,
  ParameterRow,
  ParameterLabel,
  RotaryEncoder,
} from "./styled";

interface BaseModuleProps {
  id: string;
  definition: ModuleDefinition;
  position: { x: number; y: number };
  parameters: Record<string, ModuleValue>;
  onParameterChange: (name: string, value: ModuleValue) => void;
  onStartConnectionFrom: (
    moduleId: string,
    portName: string,
    isInput: boolean
  ) => void;
}

export const BaseModule: React.FC<BaseModuleProps> = ({
  id,
  definition,
  position,
  parameters,
  onParameterChange,
  onStartConnectionFrom,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = transform
    ? {
        transform: `translate3d(${position.x + transform.x}px, ${
          position.y + transform.y
        }px, 0)`,
      }
    : {
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      };

  return (
    <ModuleContainer
      ref={setNodeRef}
      style={style}
      $isDragging={isDragging}
      id={`module-${id}`}
      {...attributes}
      {...listeners}
    >
      <ModuleHeader>{definition.name}</ModuleHeader>
      <ModuleBody>
        <PortsContainer>
          {definition.inputs.map((input) => (
            <PortRow key={input.name}>
              <Port
                id={`port-${id}-${input.name}`}
                $isInput
                onClick={() => onStartConnectionFrom(id, input.name, true)}
              />
              <PortLabel $isInput>{input.name}</PortLabel>
            </PortRow>
          ))}

          {definition.outputs.map((output) => (
            <PortRow key={output.name}>
              <PortLabel>{output.name}</PortLabel>
              <Port
                id={`port-${id}-${output.name}`}
                onClick={() => onStartConnectionFrom(id, output.name, false)}
              />
            </PortRow>
          ))}
        </PortsContainer>

        {definition.parameters.map((param) => (
          <ParameterRow key={param.name}>
            <ParameterLabel>{param.name}</ParameterLabel>
            <RotaryEncoder
              min={param.min ?? 0}
              max={param.max ?? 1}
              step={0.01}
              value={parameters[param.name] ?? param.default ?? 0}
              onChange={(e) =>
                onParameterChange(param.name, parseFloat(e.target.value))
              }
            />
          </ParameterRow>
        ))}
      </ModuleBody>
    </ModuleContainer>
  );
};
