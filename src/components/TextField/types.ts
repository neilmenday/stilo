export type TextFieldVariant =
  | 'Default'
  | 'Number field'
  | 'Default inline'
  | 'Inline number field';

export type TextFieldState =
  | 'Default'
  | 'Hover'
  | 'Focus'
  | 'Press'
  | 'Inactive';

export interface TextFieldProps {
  variant?:     TextFieldVariant;
  label?:       string;
  showLabel?:   boolean;
  showInfo?:    boolean;
  infoText?:    string;
  placeholder?: string;
  helperText?:  string;
  errorText?:   string;
  forcedState?: TextFieldState;
  value?:       string;
  onChange?:    (v: string) => void;
  required?:    boolean;
  disabled?:    boolean;
  id?:          string;
  labelWidth?:  number;
  labelAlign?:  'left' | 'right';
}
