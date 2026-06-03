import type React from 'react';

export type TableSetVariant = 'drawer' | 'overlay';

export interface TableSetProps {
  variant?: TableSetVariant;
  columns: unknown[];
  rows: unknown[];
  showTotals?: boolean;
  showCheckbox?: boolean;
  panelTitle?: (row: unknown) => string;
  renderPanelContent?: (row: unknown, onClose: () => void) => React.ReactNode;
  onPanelSave?: (row: unknown) => void;
  drawerWidth?: number;
  overlayWidth?: number;
}
