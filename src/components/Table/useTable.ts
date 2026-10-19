import { useState } from 'react';

import type { TableSort } from './types';

interface UseTableOptions {
  columns: { key: string; cellType?: string; headerType?: string }[];
  rows: Record<string, unknown>[];
  onSelectionChange?: (selectedCount: number, selectedRows: unknown[]) => void;
  sort?: TableSort;
  onSortChange?: (sort: TableSort) => void;
}

/** A table's starting sort: its Identifier column A-Z, else its first Order column. */
export function initialTableSort(columns: { key: string; cellType?: string; headerType?: string }[]): TableSort {
  const identCol = columns.find(c => c.cellType === 'Identifier cell');
  if (identCol) return { key: identCol.key, dir: 'asc' };
  const orderCol = columns.find(c => c.headerType === 'Order Default' || c.headerType === 'Order Down' || c.headerType === 'Order Up');
  if (!orderCol) return { key: null, dir: null };
  return { key: orderCol.key, dir: orderCol.headerType === 'Order Down' ? 'desc' : 'asc' };
}

/** Rows in a sort's order (shared by the table and anything showing the same rows). */
export function sortTableRows<T extends Record<string, unknown>>(rows: T[], sort: TableSort): T[] {
  const { key, dir } = sort;
  if (!key || !dir) return rows;
  return [...rows].sort((a, b) => {
    const cmp = String(a[key] ?? '').localeCompare(String(b[key] ?? ''), undefined, { numeric: true });
    return dir === 'asc' ? cmp : -cmp;
  });
}

export function useTable({ columns, rows, onSelectionChange, sort: controlledSort, onSortChange }: UseTableOptions) {
  const [selectedRows, setSelectedRows] = useState(new Set<number>());
  const [ownSort, setOwnSort] = useState<TableSort>(() => initialTableSort(columns));
  const sort = controlledSort ?? ownSort;
  const setSort = (next: TableSort) => { setOwnSort(next); onSortChange?.(next); };
  const sortKey = sort.key;
  const sortDir = sort.dir;

  const sortedRows = sortTableRows(rows, sort);

  const selectedRowsData = (indices: Set<number>) =>
    Array.from(indices).map(i => sortedRows[i]).filter((r): r is Record<string, unknown> => r !== undefined);

  const toggleRow = (idx: number, val: boolean) => {
    const next = new Set(selectedRows);
    val ? next.add(idx) : next.delete(idx);
    setSelectedRows(next);
    onSelectionChange?.(next.size, selectedRowsData(next));
  };

  const allSelected = rows.length > 0 && selectedRows.size === rows.length;
  const toggleAll = (v: boolean) => {
    const next = v ? new Set(rows.map((_, i) => i)) : new Set<number>();
    setSelectedRows(next);
    onSelectionChange?.(next.size, selectedRowsData(next));
  };

  const handleSort = (colKey: string) => {
    if (sortKey !== colKey) setSort({ key: colKey, dir: 'asc' });
    else if (sortDir === 'asc') setSort({ key: colKey, dir: 'desc' });
    else setSort({ key: null, dir: null });
  };

  return { selectedRows, sortKey, sortDir, allSelected, sortedRows, toggleRow, toggleAll, handleSort };
}
