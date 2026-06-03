import type React from 'react';

export interface FunctionsBarProps {
  alignment?: 'left' | 'right';
  cancelLabel?: string;
  onCancel?: () => void;
  saveLabel?: string;
  onSave?: () => void;
  saveDisabled?: boolean;
  configureLabel?: string;
  onConfigure?: () => void;
  configureDisabled?: boolean;
  configureIcon?: React.ReactNode;
  leftSlot?: React.ReactNode;
  notification?: string;
}
