import React from "react";
import { useDraggable } from "@dnd-kit/core";
import type { ModuleDefinition, ModuleValue } from "../types/module";
import {
  ModuleContainer,
  ModuleHeader,
  ModuleBody,
  PortRow,
  Port,
  PortLabel,
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
    <ModuleContainer ref={setNodeRef} style={style} $isDragging={isDragging}>
      <ModuleHeader {...attributes} {...listeners}>
        {definition.name}
      </ModuleHeader>
      <ModuleBody>
        {definition.inputs.map((input) => (
          <PortRow key={input.name}>
            <Port onClick={() => onStartConnectionFrom(id, input.name, true)} />
            <PortLabel>{input.name}</PortLabel>
          </PortRow>
        ))}

        {definition.parameters.map((param) => (
          <PortRow key={param.name}>
            <RotaryEncoder
              onClick={() => {
                // For now, just increment by 0.1
                const currentValue =
                  parameters[param.name] ?? param.default ?? 0;
                const newValue =
                  param.min !== undefined && param.max !== undefined
                    ? Math.min(
                        param.max,
                        Math.max(param.min, currentValue + 0.1)
                      )
                    : currentValue + 0.1;
                onParameterChange(param.name, newValue);
              }}
            />
            <PortLabel>{`${param.name}: ${
              parameters[param.name]?.toFixed(2) ?? param.default
            }`}</PortLabel>
          </PortRow>
        ))}

        {definition.outputs.map((output) => (
          <PortRow key={output.name}>
            <Port
              onClick={() => onStartConnectionFrom(id, output.name, false)}
            />
            <PortLabel>{output.name}</PortLabel>
          </PortRow>
        ))}
      </ModuleBody>
    </ModuleContainer>
  );
};
