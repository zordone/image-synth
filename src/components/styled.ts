import styled from "styled-components";

export const Workspace = styled.div`
  width: 100vw;
  height: 100vh;
  background: #1e1e1e;
  display: flex;
  color: #e0e0e0;
`;

export const LeftPanel = styled.div`
  width: 200px;
  background: #252526;
  border-right: 1px solid #3c3c3c;
  padding: 16px;
`;

export const RightPanel = styled.div`
  width: 200px;
  background: #252526;
  border-left: 1px solid #3c3c3c;
  padding: 16px;
`;

export const ModuleArea = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
`;

export const ModuleContainer = styled.div<{ $isDragging?: boolean }>`
  position: absolute;
  background: #2d2d2d;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  min-width: 120px;
  user-select: none;
  opacity: ${(props) => (props.$isDragging ? 0.7 : 1)};

  &:hover {
    border-color: #4c4c4c;
  }
`;

export const ModuleHeader = styled.div`
  padding: 8px;
  background: #3c3c3c;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  cursor: move;
  font-weight: bold;
`;

export const ModuleMenuButton = styled.button`
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

export const PortsContainer = styled.div`
  padding: 8px;
`;

export const PortRow = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
  height: 24px;
`;

export const Port = styled.div<{ $isInput?: boolean }>`
  width: 12px;
  height: 12px;
  border: 2px solid #666;
  border-radius: 50%;
  background: #2d2d2d;
  cursor: pointer;
  order: ${(props) => (props.$isInput ? 0 : 2)};

  &:hover {
    border-color: #999;
  }
`;

export const PortLabel = styled.span<{ $isInput?: boolean }>`
  margin: ${(props) => (props.$isInput ? "0 8px 0 4px" : "0 4px 0 8px")};
  order: 1;
`;

export const ConnectionsOverlay = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const ConnectionPath = styled.path<{ $isError?: boolean }>`
  fill: none;
  stroke: ${(props) => (props.$isError ? "#ff4444" : "#666")};
  stroke-width: 2;
  pointer-events: auto;
  cursor: pointer;
  transition: stroke 0.2s ease;

  &:hover {
    stroke: ${(props) => (props.$isError ? "#ff6666" : "#999")};
  }
`;

export const TemporaryConnectionPath = styled(ConnectionPath)`
  stroke-dasharray: 4;
`;

export const ModuleBody = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ParameterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const ParameterLabel = styled.span`
  flex: 1;
`;

export const CanvasOutput = styled.canvas`
  width: 200px;
  height: 200px;
  background: #1e1e1e;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
`;

export const RotaryEncoder = styled.input.attrs({ type: "range" })`
  width: 60px;
`;
