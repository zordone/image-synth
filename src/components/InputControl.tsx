import React, { useState, useRef } from "react";
import styled from "styled-components";
import type { ModuleInput, ModuleValue } from "../types/module";

const InputContainer = styled.div.withConfig({
  displayName: "InputContainer",
})`
  position: relative;
  min-width: 80px;
  margin-left: 4px;
`;

const InputWrapper = styled.div.withConfig({
  displayName: "InputWrapper",
})`
  position: relative;
  background: #0002;
  border: 1px solid #444;
  border-radius: 4px;
  overflow: hidden;
  &:focus-within {
    outline: 1px solid #86b2da;
  }
`;

const ProgressBackground = styled.div.withConfig({
  displayName: "ProgressBackground",
})<{ $progress: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${(props) => props.$progress * 100}%;
  background: #86b2da40;
  transition: width 0.1s ease;
`;

const StyledInput = styled.input.withConfig({
  displayName: "StyledInput",
})`
  background: transparent;
  border: none;
  outline: none;
  color: #ffffff;
  padding: 4px 4px 4px 0;
  width: 0;
  flex: 1 0 50px;
  font: inherit;
  text-align: right;
  position: relative;
  z-index: 1;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  &:focus {
    outline: none;
  }
`;

const InputLabel = styled.label.withConfig({
  displayName: "InputLabel",
})`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #e0e0e0;
  padding: 0 4px;
  gap: 8px;
`;

interface InputControlProps {
  input: ModuleInput;
  value: ModuleValue;
  onChange: (value: ModuleValue) => void;
}

export const InputControl: React.FC<InputControlProps> = ({
  input,
  value,
  onChange,
}) => {
  // Helper function to format numbers for display
  const formatNumberForDisplay = (num: number): string => {
    // Determine number of decimal places based on step size
    const step = input.step ?? 0.01;
    const decimalPlaces = Math.max(0, Math.ceil(-Math.log10(step)));

    // Round to appropriate decimal places and remove trailing zeros
    return Number(num.toFixed(Math.min(decimalPlaces, 6))).toString();
  };

  const [inputText, setInputText] = useState(
    formatNumberForDisplay(
      typeof value === "number" ? value : (input.default as number) ?? 0
    )
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const numberValue =
    typeof value === "number" ? value : (input.default as number) ?? 0;

  const hasMinMax =
    typeof input.min === "number" && typeof input.max === "number";
  const progress = hasMinMax
    ? Math.max(
        0,
        Math.min(1, (numberValue - input.min!) / (input.max! - input.min!))
      )
    : 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setInputText(newText);

    // Try to parse the number, but don't clear the input if it's invalid
    const parsed = parseFloat(newText);
    if (!isNaN(parsed)) {
      let finalValue = parsed;
      // Apply min/max constraints if they exist
      if (typeof input.min === "number") {
        finalValue = Math.max(input.min, finalValue);
      }
      if (typeof input.max === "number") {
        finalValue = Math.min(input.max, finalValue);
      }
      onChange(finalValue);
    }
  };

  const handleBlur = () => {
    // On blur, ensure the input shows the actual value formatted nicely
    setInputText(formatNumberForDisplay(numberValue));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const step = input.step ?? 0.01;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      let newValue = numberValue + step;
      if (typeof input.max === "number") {
        newValue = Math.min(input.max, newValue);
      }
      onChange(newValue);
      setInputText(formatNumberForDisplay(newValue));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      let newValue = numberValue - step;
      if (typeof input.min === "number") {
        newValue = Math.max(input.min, newValue);
      }
      onChange(newValue);
      setInputText(formatNumberForDisplay(newValue));
    }
  };

  if (input.type !== "number") {
    return null; // Only handle number inputs for now
  }

  return (
    <InputContainer>
      <InputWrapper>
        {hasMinMax && <ProgressBackground $progress={progress} />}
        <InputLabel>
          {input.name}
          <StyledInput
            ref={inputRef}
            type="number"
            value={inputText}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            step={input.step ?? 0.01}
            min={input.min}
            max={input.max}
          />
        </InputLabel>
      </InputWrapper>
    </InputContainer>
  );
};
