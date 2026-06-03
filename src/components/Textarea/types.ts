import type { ChangeEvent } from 'react';

export interface TextareaProps {
  label?: string;
  showLabel?: boolean;
  showInfo?: boolean;
  infoTitle?: string;
  infoBody?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  maxLength?: number;
  rows?: number;
  layout?: 'stacked' | 'inline';
  labelWidth?: number;
  labelAlign?: 'left' | 'right';
}
