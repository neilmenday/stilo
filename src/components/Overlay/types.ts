import type React from 'react';

export interface OverlayProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  width?: number;
  variant?: 'default' | 'large';
  children?: React.ReactNode;
  /** Escape hatch for a footer that isn't a save/cancel action bar — for the
   *  common case, prefer onSave/saveLabel/etc. below, which render a nested
   *  FunctionsBar. If both are given, footer wins. */
  footer?: React.ReactNode;
  onCancel?: () => void;
  onSave?: () => void;
  saveLabel?: string;
  cancelLabel?: string;
  saveDisabled?: boolean;
  footerAlignment?: 'left' | 'right';
}

export interface OverlayContextValue {
  openCount:  number;
  register:   () => void;
  unregister: () => void;
}
