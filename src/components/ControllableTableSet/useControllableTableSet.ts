import { useState, useMemo, useEffect } from 'react';

interface FilterField {
  key: string;
  label: string;
  type: 'combobox';
  items: { value: string; label: string }[];
}

interface UseControllableTableSetOptions {
  columns: { key: string; title: string; cellType?: string }[];
  rows: Record<string, unknown>[];
  tabFilterKey?: string;
  activeTabId?: string;
  onPanelSave?: (row: unknown) => void;
  onNavigate?: (row: unknown) => void;
}

export function useControllableTableSet({
  columns,
  rows,
  tabFilterKey,
  activeTabId,
  onPanelSave,
  onNavigate,
}: UseControllableTableSetOptions) {
  const [filterValue,      setFilterValue]      = useState<string | null>(null);
  const [filterMegaValues, setFilterMegaValues] = useState<Record<string, string>>({});
  const [searchText,       setSearchText]       = useState('');
  const [selectedCount,    setSelectedCount]    = useState(0);
  const [selectedRow,      setSelectedRow]      = useState<unknown>(null);
  const [isDirty,          setIsDirty]          = useState(false);

  useEffect(() => { setIsDirty(false); }, [selectedRow]);

  const onClose    = () => setSelectedRow(null);
  const handleSave = () => { onPanelSave?.(selectedRow); onClose(); };

  const filterVariant: 'combobox' | 'filter-mega' = columns.length >= 2 ? 'filter-mega' : 'combobox';

  const filterFields = useMemo<FilterField[]>(() =>
    columns.map(col => ({
      key:   col.key,
      label: col.title,
      type:  'combobox' as const,
      items: Array.from(new Set(rows.map(r => String((r as Record<string, unknown>)[col.key] ?? '')).filter(Boolean)))
               .map(v => ({ value: v, label: v })),
    })),
    [columns, rows]
  );

  const filterKey   = columns[0]?.key;
  const filterItems = filterFields[0]?.items ?? [];
  const clearAllFilters = () => { setFilterValue(null); setFilterMegaValues({}); };

  const filteredRows = rows.filter(row => {
    const r = row as Record<string, unknown>;
    if (tabFilterKey && activeTabId && activeTabId !== 'all') {
      if (String(r[tabFilterKey] ?? '').toLowerCase() !== activeTabId) return false;
    }
    if (filterVariant === 'combobox' && filterValue && filterKey) {
      if (String(r[filterKey]) !== filterValue) return false;
    }
    if (filterVariant === 'filter-mega') {
      for (const [key, value] of Object.entries(filterMegaValues)) {
        if (value && r[key] !== undefined && String(r[key]) !== value) return false;
      }
    }
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      if (!Object.values(r).some(v => String(v).toLowerCase().includes(q))) return false;
    }
    return true;
  });

  return {
    filterValue, setFilterValue,
    filterMegaValues, setFilterMegaValues,
    searchText, setSearchText,
    selectedCount, setSelectedCount,
    selectedRow, setSelectedRow,
    isDirty, setIsDirty,
    onClose, handleSave,
    filterVariant, filterFields, filterItems, clearAllFilters,
    filteredRows,
  };
}
