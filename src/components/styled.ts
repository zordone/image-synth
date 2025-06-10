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
`;

export const RightPanel = styled.div.withConfig({ displayName: "RightPanel" })`
  background: #252526;
  border-left: 1px solid #3c3c3c;
  padding: 16px;
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

  &:hover {
    background: #3c3c3c;
  }
`;

export const PortsContainer = styled.div.withConfig({
  displayName: "PortsContainer",
})`
  padding: 8px;
`;

export const PortRow = styled.div.withConfig({ displayName: "PortRow" })<{
  $isInput?: boolean;
}>`
  display: flex;
  align-items: center;
  margin: 4px 0;
  height: 24px;
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
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 2;
`;

export const ConnectionPath = styled.path.withConfig({
  displayName: "ConnectionPath",
})<{ $isError?: boolean }>`
  fill: none;
  stroke: ${(props) => (props.$isError ? "#ff4444" : "#666")};
  stroke-width: 8;
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
    font-size: 12px;
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
  stroke-dasharray: 8 10;
  stroke-opacity: 0.7;
  stroke-width: 8;
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
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ParameterLabel = styled.span.withConfig({
  displayName: "ParameterLabel",
})`
  flex: 1;
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

export const RotaryEncoder = styled.input
  .attrs({ type: "range" })
  .withConfig({ displayName: "RotaryEncoder" })`
  width: 60px;
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
  font-size: 12px;
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

export const ValueDisplay = styled.div.withConfig({
  displayName: "ValueDisplay",
})`
  background: #1e1e1e;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  text-align: center;
  margin: 4px 0;
`;

export const DeleteButton = styled.button.withConfig({
  displayName: "DeleteButton",
})`
  background: none;
  border: none;
  color: #666;
  font-size: 18px;
  cursor: pointer;
  padding: 0;
  line-height: 1;

  &:hover {
    color: #ff4444;
  }
`;
