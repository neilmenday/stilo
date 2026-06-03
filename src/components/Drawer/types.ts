import type React from 'react';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  onSave?: () => void;
  title?: string;
  width?: number;
  actions?: React.ReactNode;
  children?: React.ReactNode;
}
