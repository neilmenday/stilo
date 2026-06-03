import { useState, useEffect, useRef } from 'react';
import type { MRFRowData, MRFFieldOption, MRF_STACK_BREAKPOINT } from './types';
import type { ComboboxItem } from '../Combobox/types';

let _rowCounter = 0;
function makeRow(): MRFRowData {
  return {
    id: String(++_rowCounter), resetKey: 0,
    fieldValue: null, fieldLabel: null,
    field2Value: null, field2Label: null,
    subFieldSelections: [],
    conditionValue: null, conditionLabel: null,
    valueCombo: null, valueComboLabel: null,
    valueText: '',
  };
}

interface UseMRFOptions {
  variant?: 'default' | 'dual';
  fieldOptions: MRFFieldOption[];
  maxRows?: number;
  onChange?: (rows: MRFRowData[]) => void;
}

export function useMRF({ variant = 'default', fieldOptions, maxRows = 10, onChange }: UseMRFOptions) {
  const isDual = variant === 'dual';
  const STACK_BREAKPOINT = 560;

  const [rows, setRows] = useState<MRFRowData[]>(() => [makeRow()]);
  const [isStacked, setIsStacked] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  const maxSubCount = isDual ? 0 : Math.max(0, ...fieldOptions.map(f => f.subFields?.length ?? 0));

  useEffect(() => {
    if (!isDual || !containerRef.current) return;
    const obs = new ResizeObserver(([entry]) => {
      setIsStacked(entry.contentRect.width < STACK_BREAKPOINT);
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, [isDual]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => setIsOverflowing(el.scrollWidth > el.clientWidth);
    check();
    const obs = new ResizeObserver(check);
    obs.observe(el);
    return () => obs.disconnect();
  }, [rows.length]);

  const patch = (id: string, update: Partial<MRFRowData>) => {
    const next = rows.map(r => r.id === id ? { ...r, ...update } : r);
    setRows(next); onChange?.(next);
  };

  const addRow = () => {
    if (rows.length >= maxRows) return;
    const next = [...rows, makeRow()]; setRows(next); onChange?.(next);
  };

  const removeRow = (id: string) => {
    const next = rows.filter(r => r.id !== id); setRows(next); onChange?.(next);
  };

  const clearRow = (id: string) => {
    const next = rows.map(r => r.id === id ? { ...makeRow(), id: r.id, resetKey: r.resetKey + 1 } : r);
    setRows(next); onChange?.(next);
  };

  const handleFieldSelect    = (rowId: string, item: ComboboxItem) => patch(rowId, { fieldValue: item.value, fieldLabel: item.label, subFieldSelections: [] });
  const handleField2Select   = (rowId: string, item: ComboboxItem) => patch(rowId, { field2Value: item.value, field2Label: item.label });
  const handleConditionSelect = (rowId: string, item: ComboboxItem) => patch(rowId, { conditionValue: item.value, conditionLabel: item.label });
  const handleValueComboSelect = (rowId: string, item: ComboboxItem) => patch(rowId, { valueCombo: item.value, valueComboLabel: item.label });
  const handleValueTextChange = (rowId: string, text: string) => patch(rowId, { valueText: text });
  const handleSubFieldSelect  = (rowId: string, subIdx: number, item: ComboboxItem) => {
    setRows(prev => {
      const next = prev.map(r => {
        if (r.id !== rowId) return r;
        const subs = [...r.subFieldSelections];
        subs[subIdx] = item;
        return { ...r, subFieldSelections: subs };
      });
      onChange?.(next);
      return next;
    });
  };

  return {
    rows, isStacked, isOverflowing,
    containerRef, scrollRef, maxSubCount,
    patch, addRow, removeRow, clearRow,
    handleFieldSelect, handleField2Select, handleConditionSelect,
    handleValueComboSelect, handleValueTextChange, handleSubFieldSelect,
    canAdd: rows.length < maxRows,
  };
}
