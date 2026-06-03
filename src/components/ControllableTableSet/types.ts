import type React from 'react';

export type ControllableTableSetVariant = 'drawer' | 'overlay' | 'navigation';

export interface ControllableTableSetProps {
  columns: unknown[];
  rows: unknown[];
  variant?:            ControllableTableSetVariant;
  panelTitle?:         (row: unknown) => string;
  renderPanelContent?: (row: unknown, onClose: () => void) => React.ReactNode;
  onPanelSave?:        (row: unknown) => void;
  onNavigate?:         (row: unknown) => void;
  drawerWidth?:        number;
  overlayWidth?:       number;
  tabs?:          { id: string; label: string }[];
  activeTabId?:   string;
  onTabChange?:   (id: string) => void;
  tabFilterKey?:  string;
  filterPanelWidth?: number;
  renderFilterResponse?: (values: Record<string, string>) => React.ReactNode;
  searchLabel?: string;
  bulkLabel?: string;
  bulkItems?: { value: string; label: string }[];
  buttonLabel?: string;
  onButtonClick?: () => void;
  showFilter?:  boolean;
  showSearch?:  boolean;
  showAction?:  boolean;
  showButton?:  boolean;
  showHistory?: boolean;
  historyLabel?: string;
  onHistoryClick?: () => void;
  onLabel?:  string;
  offLabel?: string;
  showIdentifierIcon?: boolean;
  identifierIconName?: string;
  showTotals?: boolean;
  totalsData?: Record<string, unknown>;
  contentText?:    string;
  contentVariant?: string;
}
