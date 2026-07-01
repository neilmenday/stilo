import { useState, useRef } from 'react';
import type React from 'react';

export function useDraggableRows(initialRows: Record<string, unknown>[]) {
  const [rows, setRows] = useState(initialRows);
  const dragIndex = useRef<number | null>(null);

  const dragHandlers = (index: number): {
    draggable: true;
    onDragStart: () => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd: () => void;
  } => ({
    draggable: true,
    onDragStart: () => { dragIndex.current = index; },
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (dragIndex.current === null || dragIndex.current === index) return;
      setRows(prev => {
        const next = [...prev];
        const [item] = next.splice(dragIndex.current!, 1);
        next.splice(index, 0, item);
        dragIndex.current = index;
        return next;
      });
    },
    onDragEnd: () => { dragIndex.current = null; },
  });

  return { draggableRows: rows, dragHandlers };
}
