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
  ErrorTooltip,
  DeleteButton,
  CanvasOutput,
} from "./styled";
import { InputControl } from "./InputControl";

interface BaseModuleProps {
  id: string;
  definition: ModuleDefinition;
  position: { x: number; y: number };
  inputValues: Record<string, ModuleValue>; // Values for non-required inputs (formerly parameters)
  connectedInputs: Record<string, ModuleValue>; // Values from connections
  connections: Set<string>; // Set of input names that have connections
  onInputValueChange: (name: string, value: ModuleValue) => void;
  onStartConnectionFrom: (
    moduleId: string,
    portName: string,
    isInput: boolean
  ) => void;
  onDelete?: (moduleId: string) => void;
  outputCanvasRef?: React.RefObject<HTMLCanvasElement | null>;
}

export const BaseModule: React.FC<BaseModuleProps> = ({
  id,
  definition,
  position,
  inputValues,
  connectedInputs,
  connections,
  onInputValueChange,
  onStartConnectionFrom,
  onDelete,
  outputCanvasRef,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  // Combine inputValues and connectedInputs to get all input values
  const allInputs = React.useMemo(() => {
    return { ...inputValues, ...connectedInputs };
  }, [inputValues, connectedInputs]);

  // Check for any missing required inputs or invalid input types
  const errors = React.useMemo(() => {
    const inputErrors = new Set<string>();

    definition.inputs.forEach((input) => {
      const value = allInputs[input.name];
      if (input.required && value === undefined) {
        inputErrors.add(input.name);
      } else if (value !== undefined && !validateInput(value, input.type)) {
        inputErrors.add(input.name);
      }
    });

    return inputErrors;
  }, [definition.inputs, allInputs]);

  // Generate error message
  const errorMessage = React.useMemo(() => {
    if (errors.size === 0) return "";

    const messages = [];
    for (const inputName of errors) {
      const input = definition.inputs.find((i) => i.name === inputName);
      if (!input) continue;

      const value = allInputs[inputName];
      if (value === undefined && input.required) {
        messages.push(`Missing required input: ${inputName}`);
      } else if (value !== undefined && !validateInput(value, input.type)) {
        messages.push(`Invalid type for input: ${inputName}`);
      }
    }
    return messages.join("\n");
  }, [errors, definition.inputs, allInputs]);

  const style = transform
    ? {
        transform: `translate3d(${position.x + transform.x}px, ${
          position.y + transform.y
        }px, 0)`,
      }
    : {
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      };

  // Get canvas ref from context if this is an output module
  const isOutputModule = definition.id === "output";

  return (
    <ModuleContainer
      ref={setNodeRef}
      style={style}
      $isDragging={isDragging}
      $hasError={errors.size > 0}
      id={`module-${id}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {errorMessage && (
        <ErrorTooltip $show={showTooltip}>{errorMessage}</ErrorTooltip>
      )}
      <ModuleHeader {...attributes} {...listeners}>
        {definition.name}
        {onDelete && (
          <DeleteButton onClick={() => onDelete(id)}>Ｘ</DeleteButton>
        )}
      </ModuleHeader>
      <ModuleBody>
        {isOutputModule && <CanvasOutput ref={outputCanvasRef} />}
        <PortsContainer>
          {definition.inputs.map((input) => {
            const isConnected = connections.has(input.name);
            const isRequired = input.required;
            return (
              <PortRow key={input.name} $isInput>
                <Port
                  id={`port-${id}-${input.name}`}
                  $isInput
                  $type={input.type}
                  $isError={errors.has(input.name)}
                  onClick={() => onStartConnectionFrom(id, input.name, true)}
                />
                {isConnected || isRequired ? (
                  // Just show the label when connected or required
                  <PortLabel $isInput>{input.name}</PortLabel>
                ) : (
                  // Show editable input when not connected and not required
                  <InputControl
                    input={input}
                    value={inputValues[input.name] ?? input.default}
                    onChange={(value) => onInputValueChange(input.name, value)}
                  />
                )}
              </PortRow>
            );
          })}

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
      </ModuleBody>
    </ModuleContainer>
  );
};
