import { useState, useEffect, useRef } from 'react';
import type { ConditionBuilderRowData } from './types';

let _rowCounter = 0;

function makeRow(initial?: Partial<ConditionBuilderRowData>): ConditionBuilderRowData {
  const freshId = String(++_rowCounter);
  const base: ConditionBuilderRowData = {
    id:              freshId,
    resetKey:        0,
    fieldValue:      null,
    fieldLabel:      null,
    conditionValue:  null,
    conditionLabel:  null,
    valueCombo:      null,
    valueComboLabel: null,
    valueText:       '',
    logic:           'AND',
  };
  return { ...base, ...initial, id: freshId };
}

interface UseConditionBuilderOptions {
  initialRows?: Partial<ConditionBuilderRowData>[];
  maxRows?: number;
  onChange?: (rows: ConditionBuilderRowData[]) => void;
}

export function useConditionBuilder({ initialRows, maxRows = 10, onChange }: UseConditionBuilderOptions = {}) {
  const [rows, setRows] = useState<ConditionBuilderRowData[]>(() =>
    initialRows && initialRows.length > 0
      ? initialRows.map(r => makeRow(r))
      : [makeRow()]
  );
  const [isOverflowing, setIsOverflowing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setIsOverflowing(el.scrollWidth > el.clientWidth);
    check();
    const obs = new ResizeObserver(check);
    obs.observe(el);
    return () => obs.disconnect();
  }, [rows.length]);

  const patch = (id: string, update: Partial<ConditionBuilderRowData>) => {
    const next = rows.map(r => r.id === id ? { ...r, ...update } : r);
    setRows(next);
    onChange?.(next);
  };

  const addRow = () => {
    if (rows.length >= maxRows) return;
    const next = [...rows, makeRow()];
    setRows(next);
    onChange?.(next);
  };

  const removeRow = (id: string) => {
    const next = rows.filter(r => r.id !== id);
    setRows(next);
    onChange?.(next);
  };

  const clearRow = (id: string) => {
    const next = rows.map(r => r.id === id
      ? { ...makeRow(), id: r.id, resetKey: r.resetKey + 1 }
      : r
    );
    setRows(next);
    onChange?.(next);
  };

  return { rows, isOverflowing, scrollRef, patch, addRow, removeRow, clearRow, canAdd: rows.length < maxRows };
}
