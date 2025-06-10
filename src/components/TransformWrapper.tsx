import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";

const Container = styled.div.withConfig({ displayName: "Container" })`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const Content = styled.div.withConfig({ displayName: "Content" })`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
`;

interface TransformWrapperProps {
  children: React.ReactNode;
  onTransform?: (transform: { scale: number; x: number; y: number }) => void;
  onScaleChange?: (scale: number) => void;
  onCancelConnection?: () => void;
}

// important. this is intentionally a global variable. this solves zoom related flickering. do not refactor this to react state.
let newScale = 1;

export const TransformWrapper: React.FC<TransformWrapperProps> = ({
  children,
  onTransform,
  onScaleChange,
  onCancelConnection,
}) => {
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const contentRef = useRef<HTMLDivElement>(null);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      newScale = Math.max(Math.min(newScale + e.deltaY / 100, 3), 0.1);

      // Calculate cursor position relative to the container
      const container = contentRef.current?.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate new position to zoom into the cursor point
      const scaleDiff = newScale / transform.scale;
      const newX = x - (x - transform.x) * scaleDiff;
      const newY = y - (y - transform.y) * scaleDiff;

      const newTransform = { scale: newScale, x: newX, y: newY };
      setTransform(newTransform);
      onTransform?.(newTransform);
      onScaleChange?.(newScale);
    },
    [transform, onTransform, onScaleChange]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      // Only handle clicks directly on the container or content, not on child elements
      const isBackgroundClick =
        e.target === e.currentTarget || e.target === contentRef.current;
      if (!isBackgroundClick) return;

      if (isBackgroundClick) {
        onCancelConnection?.();
      }

      setIsDragging(true);
      setDragStart({
        x: e.clientX - transform.x,
        y: e.clientY - transform.y,
      });

      e.preventDefault();
      e.stopPropagation();
    },
    [transform, onCancelConnection]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        const newTransform = {
          ...transform,
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        };
        setTransform(newTransform);
        onTransform?.(newTransform);
      }
    },
    [isDragging, dragStart, transform, onTransform]
  );

  const handleMouseUp = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault();
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    content.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      content.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleWheel, handleMouseMove, handleMouseUp]);

  return (
    <Container
      onMouseDown={handleMouseDown}
      style={{ cursor: isDragging ? "grabbing" : "default" }}
    >
      <Content
        ref={contentRef}
        style={{
          transform: `scale(${transform.scale}) translate(${
            transform.x / transform.scale
          }px, ${transform.y / transform.scale}px)`,
        }}
      >
        {children}
      </Content>
    </Container>
  );
};
