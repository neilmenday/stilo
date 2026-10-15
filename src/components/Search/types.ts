// Mini: the mini Combobox's size and type, no label - just the placeholder.
export type SearchVariant    = 'Default' | 'Searched' | 'Category' | 'Select' | 'Mini';
export type SearchListVariant = 'list' | 'multi-select';

export interface SearchSelectItem {
  value: string;
  label: string;
  meta?:  string;
  group?: string;
}

export interface SearchProps {
  variant?:        SearchVariant;
  showLabel?:      boolean;
  label?:          string;
  onChange?:       (value: string) => void;
  items?:          SearchSelectItem[];
  onSelect?:       (item: SearchSelectItem) => void;
  onMultiSelect?:  (values: string[]) => void;
  displayValue?:   string;
  placeholder?:    string;
  width?:          number | string;
  listVariant?:    SearchListVariant;
  selectedValues?: string[];
}
