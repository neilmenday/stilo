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
  /** Set false to hide the drawer panel's built-in Save/Cancel footer. Defaults to true. Drawer variant only. */
  showPanelFooter?:    boolean;
  /** Whether the drawer has unsaved edits. When given: with no edits, Save and
   *  Cancel are disabled and clicking outside closes the drawer; with edits,
   *  only Save / Cancel close it. Drawer variant only. */
  panelDirty?:         boolean;
  /** View options: switch between the table and a list of the same rows. The list
   *  takes the Identifier column as its identifier, columns marked
   *  `listSlot: 'meta'` under it (pills, then text), the Toggle column as its
   *  status (with its pills), and the remaining column as supporting info. */
  showViewOptions?:    boolean;
  viewMode?:           'table' | 'list';
  onViewModeChange?:   (mode: 'table' | 'list') => void;
  tabs?:          { id: string; label: string }[];
  activeTabId?:   string;
  onTabChange?:   (id: string) => void;
  tabFilterKey?:  string;
  filterPanelWidth?: number;
  renderFilterResponse?: (values: Record<string, string>) => React.ReactNode;
  searchLabel?: string;
  bulkLabel?: string;
  bulkItems?: { value: string; label: string }[];
  onBulkActionSelect?: (action: { value: string; label: string }, selectedRows: unknown[]) => void;
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
  showCheckbox?: boolean;
  draggable?: boolean;
  showTotals?: boolean;
  totalsData?: Record<string, unknown>;
  contentText?:    string;
  contentVariant?: string;
}
