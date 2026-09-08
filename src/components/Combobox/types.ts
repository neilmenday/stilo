// 'stacked' renders the same label-above-field layout as 'default' — an
// explicit name for it, alongside 'horizontal-label', rather than leaving
// that layout only reachable as the implicit default.
export type ComboboxVariant = 'default' | 'horizontal-label' | 'stacked' | 'inactive' | 'mini';
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
  // Greys out and disables interaction without changing layout — composes
  // with any variant (including 'stacked'), unlike the 'inactive' variant
  // which is itself a fixed layout choice.
  disabled?: boolean;
}
