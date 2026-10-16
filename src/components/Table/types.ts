export type TableSort = { key: string | null; dir: 'asc' | 'desc' | null };

export interface TableProps {
  columns: unknown[];
  rows: unknown[];
  showTotals?: boolean;
  totalsData?: Record<string, unknown>;
  onSelectionChange?: (selectedCount: number, selectedRows: unknown[]) => void;
  showCheckbox?: boolean;
  draggable?: boolean;
  /** The sort, when the consumer owns it (e.g. so a list view of the same rows
   *  shows them in the same order); otherwise the table keeps its own. */
  sort?: TableSort;
  onSortChange?: (sort: TableSort) => void;
}
