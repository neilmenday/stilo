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
  /** Tag mode: the field holds these tags as removable pills, with text typed
   *  after them. Enter or comma adds the typed text as a tag; left / right
   *  arrows cycle through the tags; Backspace / Delete removes the focused one. */
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
}
