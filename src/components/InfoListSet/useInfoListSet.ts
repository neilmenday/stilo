import { useState, useEffect, useRef, useCallback } from 'react';
import type React from 'react';
import type { InfoListRow, InfoListSetPanelConfig } from './types';

interface UseInfoListSetOptions {
  rows: InfoListRow[];
  panelConfig?: InfoListSetPanelConfig;
  onPanelSave?: (row: InfoListRow) => void;
  onNavigate?: (row: InfoListRow) => void;
  onReorder?: (rows: InfoListRow[]) => void;
}

export function useInfoListSet({ rows, panelConfig, onPanelSave, onNavigate, onReorder }: UseInfoListSetOptions) {
  const [selected, setSelected] = useState<InfoListRow | null>(null);
  const [isDirty,  setIsDirty]  = useState(false);
  const [orderedRows,      setOrderedRows]      = useState<InfoListRow[]>(rows);
  const [draggingActiveId, setDraggingActiveId] = useState<string | number | null>(null);
  const [dragOverId,       setDragOverId]       = useState<string | number | null>(null);
  const dragItem = useRef<string | number | null>(null);

  useEffect(() => { setIsDirty(false); }, [selected]);
  useEffect(() => { setOrderedRows(rows); }, [rows]);

  const handleDragStart = useCallback((e: React.DragEvent, id: string | number) => {
    dragItem.current = id;
    setDraggingActiveId(id);
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragEnter = useCallback((id: string | number) => {
    if (id !== dragItem.current) setDragOverId(id);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (dragItem.current !== null && dragOverId !== null) {
      setOrderedRows(prev => {
        const next = [...prev];
        const from = next.findIndex(r => r.id === dragItem.current);
        const to   = next.findIndex(r => r.id === dragOverId);
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        onReorder?.(next);
        return next;
      });
    }
    dragItem.current = null;
    setDraggingActiveId(null);
    setDragOverId(null);
  }, [dragOverId, onReorder]);

  const onClose    = () => setSelected(null);
  const handleSave = () => { onPanelSave?.(selected!); onClose(); };

  const handleIdentifierClick = (row: InfoListRow) => {
    if (panelConfig === 'navigation') { onNavigate?.(row); }
    else if (!panelConfig && row.onIdentifierClick) { row.onIdentifierClick(); }
    else { setSelected(row); }
  };

  return {
    selected, setSelected, isDirty, setIsDirty,
    orderedRows, draggingActiveId, dragOverId,
    onClose, handleSave,
    handleDragStart, handleDragEnter, handleDragEnd,
    handleIdentifierClick,
  };
}
