import { useState, useRef, useCallback } from 'react';
import type React from 'react';
import type { ListItemGroupItem } from './types';

interface UseListItemGroupOptions {
  externalItems: ListItemGroupItem[];
  variant?: string;
  onReorder?: (items: ListItemGroupItem[]) => void;
  onColourChange?: (id: string, hex: string) => void;
}

export function useListItemGroup({ externalItems, variant, onReorder, onColourChange }: UseListItemGroupOptions) {
  const [items,      setItems]      = useState<ListItemGroupItem[]>(externalItems);
  const [focusedId,  setFocusedId]  = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragItem = useRef<string | null>(null);

  const isDraggable  = variant === 'draggable';
  const isExpandable = variant === 'expandable';
  const canDrag      = isDraggable || isExpandable;

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    dragItem.current = id;
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragEnter = useCallback((id: string) => {
    if (id !== dragItem.current) setDragOverId(id);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (dragItem.current && dragOverId) {
      setItems(prev => {
        const next = [...prev];
        const from = next.findIndex(i => i.id === dragItem.current);
        const to   = next.findIndex(i => i.id === dragOverId);
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        onReorder?.(next);
        return next;
      });
    }
    dragItem.current = null;
    setDraggingId(null);
    setDragOverId(null);
  }, [dragOverId, onReorder]);

  const handleColourChange = (id: string, hex: string) => {
    setItems(prev => prev.map(it => it.id === id ? { ...it, colour: hex } : it));
    onColourChange?.(id, hex);
  };

  return {
    items,
    focusedId,
    setFocusedId,
    draggingId,
    dragOverId,
    canDrag,
    isDraggable,
    isExpandable,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
    handleColourChange,
  };
}
