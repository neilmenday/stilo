import type React from 'react';

export type ControllableTableSetVariant = 'drawer' | 'overlay' | 'navigation';

export interface ControllableTableSetProps {
  columns: unknown[];
  rows: unknown[];
  variant?:            ControllableTableSetVariant;
  panelTitle?:         (row: unknown) => string;
  /** Extra information after the drawer's title for this row (e.g. status pills). */
  panelTitleAddon?:    (row: unknown) => React.ReactNode;
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
  /** View options (Table / List). On by default in every view; false for a
   *  table-only view. The list keeps the same information:
   *  - the Identifier column -> the list identifier
   *  - the Toggle column -> the status on the right (with its pills)
   *  - Dot menu / Icon cells -> the list's action column
   *  - a column marked `listSlot: 'supporting'` (what the identifier is part of,
   *    or who acted on it) -> the supporting column (one for now)
   *  - every other column is owned by the identifier -> under it (pills, then
   *    text), unless `listMeta` says how to show them */
  showViewOptions?:    boolean;
  viewMode?:           'table' | 'list';
  onViewModeChange?:   (mode: 'table' | 'list') => void;
  /** Which table this is, for remembering its view (defaults to its column keys). */
  viewOptionsKey?:     string;
  /** The items under the list identifier, in order: a column, or several
   *  columns blended into one item with a template (`{key}` = that column's
   *  value), e.g. 'Meeting on {meeting} for {duration}'. `as` picks pill or
   *  text (default: a Pill column or a template -> pill, otherwise text).
   *  Owned columns not mentioned are added after, so nothing is lost. */
  listMeta?: ({ column: string; as?: 'pill' | 'text' } | { template: string; as?: 'pill' | 'text' })[];
  tabs?:          { id: string; label: string }[];
  activeTabId?:   string;
  onTabChange?:   (id: string) => void;
  tabFilterKey?:  string;
  /** Custom Filter fields (e.g. date ranges) in place of the ones derived from
   *  the columns. The consumer filters the rows, from onFilterChange's values. */
  filterFields?: { key: string; label: string; type: 'combobox' | 'date'; items?: { value: string; label: string }[] }[];
  onFilterChange?: (values: Record<string, string>) => void;
  /** Extra ActionsSet controls (setting Combobox, text Button, toggle, divider). */
  actionsExtras?: import('../ActionsSet/types').ActionsSetExtra[];
  /** Whether the Action list needs selected rows first (default true, for bulk
   *  actions). False for actions on the whole table, e.g. "Reorder". */
  actionNeedsSelection?: boolean;
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
