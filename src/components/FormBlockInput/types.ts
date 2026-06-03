import type { ChangeEvent } from 'react';

export interface FormBlockInputProps {
  textFieldLabel?:       string;
  textFieldPlaceholder?: string;
  onTextFieldChange?:    (value: string) => void;
  textareaLabel?:       string;
  textareaPlaceholder?: string;
  onTextareaChange?:    (e: ChangeEvent<HTMLTextAreaElement>) => void;
  notification?:         string;
  notificationVariant?:  string;
}
