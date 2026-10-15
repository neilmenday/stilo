import type React from 'react';
import type { InlineResponseVariant } from '../InlineResponse/types';

export interface FunctionsBarProps {
  alignment?: 'left' | 'right';
  cancelLabel?: string;
  onCancel?: () => void;
  saveLabel?: string;
  onSave?: () => void;
  saveDisabled?: boolean;
  /** Cancel shown but not clickable, e.g. when there's nothing to cancel. */
  cancelDisabled?: boolean;
  configureLabel?: string;
  onConfigure?: () => void;
  configureDisabled?: boolean;
  configureIcon?: React.ReactNode;
  leftSlot?: React.ReactNode;
  responseMessage?: string;
  responseVariant?: InlineResponseVariant;
}
