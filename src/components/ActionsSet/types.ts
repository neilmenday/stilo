export type FilterVariant = 'combobox' | 'filter-mega';

export type ViewMode = 'table' | 'list';

/** 'non-filter': actions only - no Filter, Search or Action list; the primary
 *  button, History and any extras, centred on one line. */
export type ActionsSetVariant = 'default' | 'non-filter';

/** Extra controls an ActionsSet can carry alongside its standard ones - only
 *  the kinds DE screens already use: a setting Combobox, a text Button, a
 *  labelled toggle, and a divider between groups. `placement` 'start' puts it
 *  before the filter; otherwise it follows the standard controls. */
export type ActionsSetExtra = { placement?: 'start' | 'end' } & (
  | { type: 'combobox'; label: string; items: { value: string; label: string }[]; displayValue?: string; placeholder?: string; onSelect?: (item: { value: string; label: string }) => void }
  | { type: 'text-button'; label: string; onClick?: () => void }
  | { type: 'toggle'; label: string; checked: boolean; onChange?: (checked: boolean) => void; onLabel?: string; offLabel?: string; disabled?: boolean; showInfo?: boolean }
  | { type: 'divider' }
);

export interface ActionsSetProps {
  variant?:         ActionsSetVariant;
  filterVariant?:   FilterVariant;
  showFilter?:      boolean;
  filterLabel?:          string;
  filterListVariant?:    string;
  filterItems?:          { value: string; label: string; meta?: string; group?: string }[];
  filterInfoTitle?:      string;
  filterInfoBody?:       string;
  showFilterInfo?:       boolean;
  filterActive?:         boolean;
  onFilterSelect?:       (item: { value: string; label: string }) => void;
  onFilterMultiSelect?:  (values: string[]) => void;
  filterFields?:         { key: string; label: string; type: 'combobox' | 'date'; items?: { value: string; label: string }[] }[];
  filterPanelWidth?:     number;
  filterMegaValues?:     Record<string, string>;
  renderFilterResponse?: (values: Record<string, string>) => unknown;
  onFilterChange?:       (values: Record<string, string>) => void;
  showSearch?:     boolean;
  searchLabel?:    string;
  onSearchChange?: (value: string) => void;
  showAction?:          boolean;
  actionLabel?:         string;
  actionListVariant?:   string;
  actionItems?:         { value: string; label: string }[];
  actionInfoTitle?:     string;
  actionInfoBody?:      string;
  showActionInfo?:      boolean;
  actionInactive?:      boolean;
  onActionSelect?:      (item: { value: string; label: string }) => void;
  onActionMultiSelect?: (values: string[]) => void;
  showButton?:     boolean;
  buttonLabel?:    string;
  onButtonClick?:  () => void;
  buttonDisabled?: boolean;
  showHistory?:    boolean;
  historyLabel?:   string;
  onHistoryClick?: () => void;
  /** Extra controls (setting Combobox, text Button, toggle, divider). */
  extras?: ActionsSetExtra[];
  /** View options (Table / List), on the far right. */
  showViewOptions?:  boolean;
  viewMode?:         ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;
}
