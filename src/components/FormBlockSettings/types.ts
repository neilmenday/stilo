import type { ButtonGroupLayout } from '../ButtonGroup/types';
import type { TextFieldVariant } from '../TextField/types';

export interface FormBlockFieldDef {
  type: 'combobox' | 'toggle' | 'textfield' | 'date' | 'buttongroup';
  label?: string;
  items?: { value: string; label: string }[];
  placeholder?: string;
  onSelect?: (item: { value: string; label: string }) => void;
  onToggleChange?: (checked: boolean) => void;
  /** Toggle: its current state, when the row's data owns it (otherwise the row keeps its own, starting off). */
  checked?: boolean;
  /** Toggle: status text for on / off (defaults On / Off). */
  onLabel?: string;
  offLabel?: string;
  /** Show the field's label (default true). */
  showLabel?: boolean;
  onTextChange?: (value: string) => void;
  /** Textfield: its current value, when the row's data owns it. */
  value?: string;
  /** Textfield: the text field variant (e.g. 'Number field'). */
  textVariant?: TextFieldVariant;
  /** Field shown but not editable. */
  disabled?: boolean;
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
