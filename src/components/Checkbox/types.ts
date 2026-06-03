export interface CheckboxBoundProps {
  checked?: boolean;
  focused?: boolean;
  disabled?: boolean;
  style?: Record<string, unknown>;
}

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  showLabel?: boolean;
  showInfo?: boolean;
  infoTitle?: string;
  infoBody?: string;
  disabled?: boolean;
  id?: string;
  variant?: 'default' | 'title';
}
