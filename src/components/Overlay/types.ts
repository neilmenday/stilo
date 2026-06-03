import type React from 'react';

export interface OverlayProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: number;
  variant?: 'default' | 'large';
  children?: React.ReactNode;
  footer?: React.ReactNode;
  onCancel?: () => void;
}

export interface OverlayContextValue {
  openCount:  number;
  register:   () => void;
  unregister: () => void;
}
