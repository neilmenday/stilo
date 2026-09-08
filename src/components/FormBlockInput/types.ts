import type { ChangeEvent } from 'react';
import type { InlineResponseVariant } from '../InlineResponse/types';

export interface FormBlockInputProps {
  textFieldLabel?:       string;
  textFieldPlaceholder?: string;
  onTextFieldChange?:    (value: string) => void;
  textareaLabel?:       string;
  textareaPlaceholder?: string;
  onTextareaChange?:    (e: ChangeEvent<HTMLTextAreaElement>) => void;
  responseMessage?:      string;
  responseVariant?:      InlineResponseVariant;
}
