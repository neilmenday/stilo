import { useState, useMemo } from 'react';

interface UseTableOptions {
  columns: { key: string; cellType?: string; headerType?: string }[];
  rows: Record<string, unknown>[];
  onSelectionChange?: (selectedCount: number) => void;
}

export function useTable({ columns, rows, onSelectionChange }: UseTableOptions) {
  const [selectedRows, setSelectedRows] = useState(new Set<number>());
  const [sortKey, setSortKey] = useState<string | null>(() => {
    const identCol = columns.find(c => c.cellType === 'Identifier cell');
    if (identCol) return identCol.key;
    const orderCol = columns.find(c => c.headerType === 'Order Default' || c.headerType === 'Order Down' || c.headerType === 'Order Up');
    return orderCol?.key ?? null;
  });
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(() => {
    const identCol = columns.find(c => c.cellType === 'Identifier cell');
    if (identCol) return 'asc';
    const orderCol = columns.find(c => c.headerType === 'Order Default' || c.headerType === 'Order Down' || c.headerType === 'Order Up');
    if (!orderCol) return null;
    return orderCol.headerType === 'Order Down' ? 'desc' : 'asc';
  });

  const toggleRow = (idx: number, val: boolean) => {
    setSelectedRows(prev => {
      const next = new Set(prev);
      val ? next.add(idx) : next.delete(idx);
      onSelectionChange?.(next.size);
      return next;
    });
  };

  const allSelected = rows.length > 0 && selectedRows.size === rows.length;
  const toggleAll = (v: boolean) => {
    const next = v ? new Set(rows.map((_, i) => i)) : new Set<number>();
    setSelectedRows(next);
    onSelectionChange?.(next.size);
  };

  const handleSort = (colKey: string) => {
    if (sortKey !== colKey) { setSortKey(colKey); setSortDir('asc'); }
    else if (sortDir === 'asc') { setSortDir('desc'); }
    else { setSortKey(null); setSortDir(null); }
  };

  const sortedRows = sortKey && sortDir
    ? [...rows].sort((a, b) => {
        const av = a[sortKey] ?? '';
        const bv = b[sortKey] ?? '';
        const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      })
    : rows;

  return { selectedRows, sortKey, sortDir, allSelected, sortedRows, toggleRow, toggleAll, handleSort };
}
