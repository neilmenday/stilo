import type { ButtonGroupLayout } from '../ButtonGroup/types';

export interface FormBlockFieldDef {
  type: 'combobox' | 'toggle' | 'textfield' | 'date' | 'buttongroup';
  label?: string;
  items?: { value: string; label: string }[];
  placeholder?: string;
  onSelect?: (item: { value: string; label: string }) => void;
  onToggleChange?: (checked: boolean) => void;
  onTextChange?: (value: string) => void;
  dateVariant?: string;
  onDateChange?: (value: string) => void;
  buttons?: string[];
  buttonGroupLayout?: ButtonGroupLayout;
  onButtonGroupChange?: (index: number) => void;
}

export interface FormBlockRowDef {
  title: string;
  description?: string;
  /** One or two fields per row. */
  fields: FormBlockFieldDef[];
}

export interface FormBlockSettingsProps {
  title?: string;
  rows: FormBlockRowDef[];
  showDescriptions?: boolean;
}
