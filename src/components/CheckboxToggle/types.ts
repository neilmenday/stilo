export interface CheckboxToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  layout?: 'stacked' | 'inline';
  showLabel?: boolean;
  showInfoIcon?: boolean;
  infoTitle?: string;
  infoBody?: string;
  showStatus?: boolean;
  onLabel?: string;
  offLabel?: string;
  errorMessage?: string | null;
  disabled?: boolean;
  id?: string;
  labelWidth?: number;
  labelAlign?: 'left' | 'right';
}
