import { useState, useRef } from 'react';
import type { MappingSetRowData } from './types';

interface UseMappingSetOptions {
  maxRows?: number;
  onChange?: (rows: MappingSetRowData[]) => void;
}

export function useMappingSet({ maxRows = 20, onChange }: UseMappingSetOptions = {}) {
  const counterRef     = useRef(0);
  const radioGroupName = useRef(`mapping-${Math.random().toString(36).slice(2, 9)}`);

  const makeRow = (): MappingSetRowData =>
    ({ id: String(++counterRef.current), resetKey: 0, values: {}, labels: {}, matched: false });

  const [rows, setRows] = useState<MappingSetRowData[]>(() => [makeRow()]);

  const update = (next: MappingSetRowData[]) => { setRows(next); onChange?.(next); };

  const patchCombobox = (id: string, key: string, item: { value: string; label: string }) =>
    update(rows.map(r => r.id === id
      ? { ...r, values: { ...r.values, [key]: item.value }, labels: { ...r.labels, [key]: item.label } }
      : r
    ));

  const patchText = (id: string, key: string, value: string) =>
    update(rows.map(r => r.id === id ? { ...r, values: { ...r.values, [key]: value } } : r));

  const patchMatched = (id: string) =>
    setRows(prev => {
      const next = prev.map(r => ({ ...r, matched: r.id === id }));
      onChange?.(next);
      return next;
    });

  const addRow = () => { if (rows.length >= maxRows) return; update([...rows, makeRow()]); };
  const removeRow = (id: string) => { if (rows.length <= 1) return; update(rows.filter(r => r.id !== id)); };
  const clearRow = (id: string) =>
    update(rows.map(r => r.id === id
      ? { ...makeRow(), id: r.id, resetKey: r.resetKey + 1, matched: r.matched }
      : r
    ));

  return { rows, radioGroupName: radioGroupName.current, patchCombobox, patchText, patchMatched, addRow, removeRow, clearRow };
}
