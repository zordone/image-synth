import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import type { ModuleDefinition, ModuleValue } from "../types/module";
import { validateInput } from "../types/module";
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
  ErrorTooltip,
} from "./styled";

interface BaseModuleProps {
  id: string;
  definition: ModuleDefinition;
  position: { x: number; y: number };
  parameters: Record<string, ModuleValue>;
  inputs: Record<string, ModuleValue>;
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
  inputs,
  onParameterChange,
  onStartConnectionFrom,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  // Check for any missing required inputs or invalid input types
  const errors = React.useMemo(() => {
    const inputErrors = new Set<string>();

    definition.inputs.forEach((input) => {
      const value = inputs[input.name];
      if (input.required && value === undefined) {
        inputErrors.add(input.name);
      } else if (value !== undefined && !validateInput(value, input.type)) {
        inputErrors.add(input.name);
      }
    });

    return inputErrors;
  }, [definition.inputs, inputs]);

  // Generate error message
  const errorMessage = React.useMemo(() => {
    if (errors.size === 0) return "";

    const messages = [];
    for (const inputName of errors) {
      const input = definition.inputs.find((i) => i.name === inputName);
      if (!input) continue;

      const value = inputs[inputName];
      if (value === undefined && input.required) {
        messages.push(`Missing required input: ${inputName}`);
      } else if (value !== undefined && !validateInput(value, input.type)) {
        messages.push(`Invalid type for input: ${inputName}`);
      }
    }
    return messages.join("\n");
  }, [errors, definition.inputs, inputs]);

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
      $hasError={errors.size > 0}
      id={`module-${id}`}
      {...attributes}
      {...listeners}
      onMouseEnter={() => errors.size > 0 && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {errorMessage && (
        <ErrorTooltip $show={showTooltip}>{errorMessage}</ErrorTooltip>
      )}
      <ModuleHeader>{definition.name}</ModuleHeader>
      <ModuleBody>
        <PortsContainer>
          {definition.inputs.map((input) => (
            <PortRow key={input.name}>
              <Port
                id={`port-${id}-${input.name}`}
                $isInput
                $type={input.type}
                $isError={errors.has(input.name)}
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
                $type={output.type}
                onClick={() => onStartConnectionFrom(id, output.name, false)}
              />
            </PortRow>
          ))}
        </PortsContainer>

        {definition.parameters.map((param) => (
          <ParameterRow key={param.name}>
            <ParameterLabel>{param.name}</ParameterLabel>
            {param.type === "number" && (
              <RotaryEncoder
                min={param.min ?? 0}
                max={param.max ?? 1}
                step={param.step ?? 0.01}
                value={(parameters[param.name] as number) ?? param.default ?? 0}
                onChange={(e) =>
                  onParameterChange(param.name, parseFloat(e.target.value))
                }
              />
            )}
          </ParameterRow>
        ))}
      </ModuleBody>
    </ModuleContainer>
  );
};
