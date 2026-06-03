import { useState, useMemo, useEffect } from 'react';
import type { ListItem } from './types';

interface FilterField {
  key: string;
  label: string;
  type: 'combobox';
  items: { value: string; label: string }[];
}

interface UseControllableListSetOptions {
  items: ListItem[];
  identifierTitle?: string;
  supportingInfoTitle?: string;
  statusTitle?: string;
  onSelectionChange?: (selectedIds: Set<string | number>) => void;
  onAnyToggleChange?: (id: string | number, checked: boolean) => void;
  onReorder?: (items: ListItem[]) => void;
  renderPanelContent?: unknown;
}

export function useControllableListSet({
  items,
  identifierTitle,
  supportingInfoTitle,
  statusTitle,
  onSelectionChange,
  onAnyToggleChange,
  onReorder,
  renderPanelContent,
}: UseControllableListSetOptions) {
  const [filterValue,      setFilterValue]      = useState<string | null>(null);
  const [filterMegaValues, setFilterMegaValues] = useState<Record<string, string>>({});
  const [searchText,       setSearchText]       = useState('');
  const [selectedIds,      setSelectedIds]      = useState<Set<string | number>>(new Set());
  const [toggleStates,     setToggleStates]     = useState<Record<string | number, boolean>>(() =>
    Object.fromEntries(items.map(item => [item.id, item.toggleChecked ?? false]))
  );
  const [selectedItem,     setSelectedItem]     = useState<ListItem | null>(null);
  const [isDirty,          setIsDirty]          = useState(false);
  const [isDragDirty,      setIsDragDirty]      = useState(false);
  const [pendingOrder,     setPendingOrder]     = useState<ListItem[] | null>(null);

  useEffect(() => { setIsDirty(false); }, [selectedItem]);
  useEffect(() => { onSelectionChange?.(selectedIds); }, [selectedIds]);

  const onClose    = () => setSelectedItem(null);
  const handleSave = () => onClose();

  const handleInternalReorder = (reorderedRows: { id: string | number }[]) => {
    const reordered = reorderedRows.map(r => items.find(i => i.id === r.id)!).filter(Boolean);
    setPendingOrder(reordered);
    setIsDragDirty(true);
  };

  const handleDragSave = () => {
    if (pendingOrder) onReorder?.(pendingOrder);
    setIsDragDirty(false);
    setPendingOrder(null);
  };

  const handleDragCancel = () => {
    setIsDragDirty(false);
    setPendingOrder(null);
  };

  const filterFields = useMemo<FilterField[]>(() => {
    const fields: FilterField[] = [];
    if (identifierTitle) {
      const vals = Array.from(new Set(items.map(i => i.identifierLabel).filter((v): v is string => Boolean(v))));
      if (vals.length) fields.push({ key: 'identifierLabel', label: identifierTitle, type: 'combobox', items: vals.map(v => ({ value: v, label: v })) });
    }
    if (supportingInfoTitle) {
      const vals = Array.from(new Set(items.map(i => i.tags?.[0]).filter((v): v is string => Boolean(v))));
      if (vals.length) fields.push({ key: 'tag0', label: supportingInfoTitle, type: 'combobox', items: vals.map(v => ({ value: v, label: v })) });
    }
    if (statusTitle) {
      const hasStatusText = items.some(i => i.statusText);
      if (hasStatusText) {
        const vals = Array.from(new Set(items.map(i => i.statusText as string | undefined).filter((v): v is string => Boolean(v))));
        if (vals.length) fields.push({ key: 'statusText', label: statusTitle, type: 'combobox', items: vals.map(v => ({ value: v, label: v })) });
      } else {
        const vals = Array.from(new Set(items.map(i => i.status).filter((v): v is 'active' | 'inactive' => Boolean(v))));
        if (vals.length) fields.push({ key: 'status', label: statusTitle, type: 'combobox', items: vals.map(v => ({ value: v, label: v.charAt(0).toUpperCase() + v.slice(1) })) });
      }
    }
    return fields;
  }, [items, identifierTitle, supportingInfoTitle, statusTitle]);

  const filterVariant: 'combobox' | 'filter-mega' = filterFields.length >= 2 ? 'filter-mega' : 'combobox';
  const filterKey   = filterFields[0]?.key;
  const filterItems = filterFields[0]?.items ?? [];
  const clearAllFilters = () => { setFilterValue(null); setFilterMegaValues({}); };

  const filteredItems = useMemo(() => items.filter(item => {
    if (filterVariant === 'combobox' && filterValue && filterKey) {
      if (filterKey === 'tag0') { if (item.tags?.[0] !== filterValue) return false; }
      else if (String(item[filterKey]) !== filterValue) return false;
    }
    if (filterVariant === 'filter-mega') {
      for (const [key, value] of Object.entries(filterMegaValues)) {
        if (!value) continue;
        if (key === 'tag0') { if (item.tags?.[0] !== value) return false; }
        else if (item[key] !== undefined && String(item[key]) !== value) return false;
      }
    }
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      if (!Object.values(item).some(v => typeof v === 'string' && v.toLowerCase().includes(q))) return false;
    }
    return true;
  }), [items, filterVariant, filterValue, filterKey, filterMegaValues, searchText]);

  const allSelected = filteredItems.length > 0 && filteredItems.every(item => selectedIds.has(item.id));
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? new Set(filteredItems.map(item => item.id)) : new Set());
  };
  const handleRowCheck = (id: string | number, checked: boolean) => {
    setSelectedIds(prev => { const next = new Set(prev); checked ? next.add(id) : next.delete(id); return next; });
  };

  const isDrawerMode = true;

  const enrichedRows = useMemo(() => filteredItems.map(item => ({
    ...item,
    rowChecked:      selectedIds.has(item.id),
    onRowCheck:      (checked: boolean) => handleRowCheck(item.id, checked),
    toggleChecked:   toggleStates[item.id] ?? false,
    onToggleChange:  (checked: boolean) => {
      setToggleStates(prev => ({ ...prev, [item.id]: checked }));
      onAnyToggleChange?.(item.id, checked);
    },
    onIdentifierClick: (isDrawerMode && renderPanelContent !== undefined) ? () => setSelectedItem(item) : (item.onIdentifierClick as (() => void) | undefined),
  })), [filteredItems, selectedIds, toggleStates, isDrawerMode, renderPanelContent, onAnyToggleChange]);

  return {
    filterValue, setFilterValue,
    filterMegaValues, setFilterMegaValues,
    searchText, setSearchText,
    selectedIds, selectedItem, setSelectedItem,
    isDirty, setIsDirty,
    isDragDirty, pendingOrder,
    onClose, handleSave,
    handleInternalReorder, handleDragSave, handleDragCancel,
    filterFields, filterVariant, filterItems, clearAllFilters,
    filteredItems, allSelected, handleSelectAll,
    enrichedRows,
  };
}
