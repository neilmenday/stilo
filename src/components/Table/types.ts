export interface TableProps {
  columns: unknown[];
  rows: unknown[];
  showTotals?: boolean;
  totalsData?: Record<string, unknown>;
  onSelectionChange?: (selectedCount: number, selectedRows: unknown[]) => void;
  showCheckbox?: boolean;
  draggable?: boolean;
}
