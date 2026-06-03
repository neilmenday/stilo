export type ComboboxVariant = 'default' | 'horizontal-label' | 'inactive' | 'mini';
export type ListVariant     = 'list' | 'list-sections' | 'multi-select' | 'multi-select-sections';

export interface ComboboxItem {
  value: string;
  label: string;
  meta?: string;
  group?: string;
}

export interface ComboboxProps {
  variant?: ComboboxVariant;
  listVariant?: ListVariant;
  label?: string;
  showLabel?: boolean;
  showInfo?: boolean;
  infoTitle?: string;
  infoBody?: string;
  errorMessage?: string | null;
  items?: ComboboxItem[];
  width?: number;
  placeholder?: string;
  displayValue?: string;
  onSelect?: (item: ComboboxItem) => void;
  onMultiSelect?: (values: string[]) => void;
  labelWidth?: number;
  labelAlign?: 'left' | 'right';
}
