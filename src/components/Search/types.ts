export type SearchVariant    = 'Default' | 'Searched' | 'Category' | 'Select';
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
