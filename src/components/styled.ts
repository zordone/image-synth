import styled from "styled-components";
import type { DataType } from "../types/module";

export const Workspace = styled.div.withConfig({ displayName: "Workspace" })`
  width: 100vw;
  height: 100vh;
  background: #1e1e1e;
  display: flex;
  color: #e0e0e0;
`;

export const LeftPanel = styled.div.withConfig({ displayName: "LeftPanel" })`
  width: 200px;
  background: #252526;
  border-right: 1px solid #3c3c3c;
  padding: 16px;
  overflow-y: scroll;
`;

export const LogoContainer = styled.div.withConfig({
  displayName: "LogoContainer",
})`
  display: grid;
  grid-template-areas: "a b";
  color: #ccd6dd;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1rem;
  opacity: 0.5;
  filter: drop-shadow(0 0 5px #0008);
  font: 0.72rem "Hanalei Fill", system-ui;
`;

export const Logo = styled.img.withConfig({ displayName: "Logo" })`
  width: 100%;
`;

export const ModuleArea = styled.div.withConfig({ displayName: "ModuleArea" })`
  flex: 1;
  position: relative;
  overflow: hidden;
  cursor: default;
`;

export const ModuleContainer = styled.div.withConfig({
  displayName: "ModuleContainer",
})<{
  $isDragging?: boolean;
  $hasError?: boolean;
}>`
  position: absolute;
  background: #2d2d2d;
  border: 1px solid ${(props) => (props.$hasError ? "#ff4444" : "#3c3c3c")};
  border-radius: 4px;
  min-width: 120px;
  user-select: none;
  z-index: 1;
  opacity: ${(props) => (props.$isDragging ? 0.7 : 1)};
  box-shadow: 0 0 15px #0008;
  cursor: default;

  /* Enable pointer events for the header */
  & > *:first-child {
    pointer-events: auto;
  }

  /* Enable pointer events for interactive elements in the body */
  & input,
  & button,
  & canvas {
    pointer-events: auto;
  }

  &:hover {
    border-color: ${(props) => (props.$hasError ? "#ff6666" : "#4c4c4c")};
  }
`;

export const ModuleHeader = styled.div.withConfig({
  displayName: "ModuleHeader",
})`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  padding: 8px;
  background: #3c3c3c;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  cursor: move;
  font-weight: bold;
  user-select: none;
  touch-action: none;
`;

export const ModuleMenuButton = styled.button.withConfig({
  displayName: "ModuleMenuButton",
})`
  width: 100%;
  padding: 8px;
  background: #2d2d2d;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  color: inherit;
  cursor: pointer;
  margin-bottom: 8px;
  font: inherit;

  &:hover {
    background: #3c3c3c;
  }
`;

export const PortsContainer = styled.div.withConfig({
  displayName: "PortsContainer",
})`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const PortRow = styled.div.withConfig({ displayName: "PortRow" })<{
  $isInput?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.$isInput ? "flex-start" : "flex-end")};
`;

export const Port = styled.div.withConfig({ displayName: "Port" })<{
  $isInput?: boolean;
  $type?: DataType;
  $isError?: boolean;
}>`
  width: 16px;
  height: 16px;
  border: 3px solid
    ${(props) => {
      if (props.$isError) return "#ff4444";
      switch (props.$type) {
        case "color":
          return "#c786da";
        case "number":
          return "#86b2da";
        default:
          return "#666";
      }
    }};
  border-radius: 50%;
  background: #2d2d2d;
  cursor: pointer;
  order: ${(props) => (props.$isInput ? 0 : 2)};
  position: relative;

  /* Add a larger clickable area without affecting visuals */
  &::after {
    content: "";
    position: absolute;
    inset: -6px;
  }

  &:hover {
    border-color: ${(props) =>
      props.$isError
        ? "#ff6666"
        : props.$type === "color"
        ? "#e39ff6"
        : "#999"};
  }
`;

export const PortLabel = styled.span.withConfig({ displayName: "PortLabel" })<{
  $isInput?: boolean;
}>`
  margin: ${(props) => (props.$isInput ? "0 8px 0 4px" : "0 4px 0 8px")};
  order: 1;
`;

export const ConnectionsOverlay = styled.svg.withConfig({
  displayName: "ConnectionsOverlay",
})`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
`;

export const ConnectionPath = styled.path.withConfig({
  displayName: "ConnectionPath",
})<{ $isError?: boolean }>`
  fill: none;
  stroke: ${(props) => (props.$isError ? "#ff4444" : "#666")};
  stroke-width: calc(8px * var(--scale, 1));
  pointer-events: auto;
  cursor: pointer;
  transition: stroke 0.2s ease;
  stroke-linecap: round;
  filter: drop-shadow(0 0 1px #000a);

  &:hover {
    stroke: ${(props) => (props.$isError ? "#ff6666" : "#999")};
  }

  /* Add tooltip on hover if error */
  &[data-error]:hover::after {
    content: attr(data-error);
    position: absolute;
    background: #ff4444;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    white-space: nowrap;
    pointer-events: none;
    transform: translate(-50%, -100%);
    left: 50%;
    top: -8px;
  }
`;

export const TemporaryConnectionPath = styled(ConnectionPath).withConfig({
  displayName: "TemporaryConnectionPath",
})`
  stroke-dasharray: calc(8px * var(--scale, 1)) calc(10px * var(--scale, 1));
  stroke-opacity: 0.7;
  pointer-events: none;
`;

export const ModuleBody = styled.div.withConfig({ displayName: "ModuleBody" })`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ParameterRow = styled.div.withConfig({
  displayName: "ParameterRow",
})`
  /* empty for now */
`;

export const ParameterLabel = styled.label.withConfig({
  displayName: "ParameterLabel",
})`
  /* empty for now */
`;

export const ParameterInput = styled.input.withConfig({
  displayName: "ParameterInput",
})`
  background: #1e1e1e;
  color: #e0e0e0;
  padding: 4px 8px;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
  margin-left: 8px;
  /* hide up/down buttons */
  appearance: textfield;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
    margin: 0;
  }
`;

export const CanvasOutput = styled.canvas.withConfig({
  displayName: "CanvasOutput",
})`
  width: 200px;
  height: 200px;
  background: #1e1e1e;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
`;

export const RotaryEncoder = styled.input.attrs({ type: "range" }).withConfig({
  displayName: "RotaryEncoder",
})`
  width: fit-content;
  cursor: pointer;
  &:active {
    cursor: ew-resize;
  }
  pointer-events: auto;
`;

export const ErrorTooltip = styled.div.withConfig({
  displayName: "ErrorTooltip",
})<{ $show: boolean }>`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: #ff4444;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transition: opacity 0.2s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: #ff4444;
  }
`;

export const DeleteButton = styled.button.withConfig({
  displayName: "DeleteButton",
})`
  background: none;
  border: none;
  border-radius: 4px;
  color: #666;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover,
  &:focus {
    color: #ff4444;
  }
`;
