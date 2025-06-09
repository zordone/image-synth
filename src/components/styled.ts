import styled from "styled-components";

export const Workspace = styled.div`
  width: 100vw;
  height: 100vh;
  background: #1e1e1e;
  display: flex;
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

export const ModuleBody = styled.div`
  padding: 8px;
`;

export const ModuleMenuButton = styled.button`
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  background: #2d2d2d;
  border: 1px solid #3c3c3c;
  color: #ffffff;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: #3c3c3c;
  }
`;

export const Port = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #4c4c4c;
  border: 2px solid #3c3c3c;
  margin: 4px;
  cursor: pointer;

  &:hover {
    background: #6c6c6c;
  }
`;

export const PortRow = styled.div`
  display: flex;
  align-items: center;
  margin: 4px 0;
`;

export const PortLabel = styled.span`
  margin: 0 8px;
  color: #cccccc;
`;

export const RotaryEncoder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #3c3c3c;
  border: 2px solid #4c4c4c;
  cursor: pointer;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 2px;
    height: 16px;
    background: #cccccc;
    transform-origin: bottom center;
  }

  &:hover {
    border-color: #6c6c6c;
  }
`;

export const CanvasOutput = styled.canvas`
  width: 100%;
  height: 200px;
  background: #000000;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
`;
