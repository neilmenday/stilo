import { useState, useMemo, useRef } from 'react';
import type { GridItem } from './types';

interface UseControllableGridSetOptions {
  items: GridItem[];
}

export function useControllableGridSet({ items }: UseControllableGridSetOptions) {
  const [filterValue,  setFilterValue]  = useState<string | null>(null);
  const [searchText,   setSearchText]   = useState('');
  const [selectedIds,  setSelectedIds]  = useState<Set<string | number>>(new Set());
  const [selectedItem, setSelectedItem] = useState<GridItem | null>(null);
  const lastItemRef = useRef<GridItem | null>(null);
  if (selectedItem) lastItemRef.current = selectedItem;

  const onClose = () => setSelectedItem(null);

  const filterItems = useMemo(() => {
    const statuses = Array.from(new Set(items.map(i => i.status).filter(Boolean))) as string[];
    return statuses.map(s => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) }));
  }, [items]);

  const clearAllFilters = () => setFilterValue(null);

  const filteredItems = useMemo(() => items.filter(item => {
    if (filterValue && item.status !== filterValue) return false;
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      if (!Object.values(item).some(v => typeof v === 'string' && v.toLowerCase().includes(q))) return false;
    }
    return true;
  }), [items, filterValue, searchText]);

  const appliedPills = filterValue
    ? [{ key: 'status', label: filterItems.find(i => i.value === filterValue)?.label ?? filterValue, onDismiss: clearAllFilters }]
    : [];

  return {
    filterValue,
    setFilterValue,
    searchText,
    setSearchText,
    selectedIds,
    setSelectedIds,
    selectedItem,
    setSelectedItem,
    lastItemRef,
    onClose,
    filterItems,
    clearAllFilters,
    filteredItems,
    appliedPills,
  };
}
