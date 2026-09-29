export interface RadioOptionType {
  value: string;
  label: string;
  disabled?: boolean;
  /** Shows an info icon after the option's label; hovering it shows this title and body. */
  infoTitle?: string;
  infoBody?: string;
}

export interface RadioGroupProps {
  label?: string;
  name?: string;
  options?: RadioOptionType[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  hint?: string;
  error?: string;
  orientation?: 'vertical' | 'horizontal';
}

export function slugifyLabel(label: string | undefined): string {
  return label ? label.toLowerCase().replace(/\s+/g, '-') : 'radio-group';
}
