import type React from 'react';

export interface DrawerPanelProps {
  title?:           string;
  titleAvatar?:     { src?: string; initials?: string };
  children?:        React.ReactNode;
  onSave?:          () => void;
  onCancel?:        () => void;
  actions?:         React.ReactNode;
  width?:           number;
  onBackdropClick?: () => void;
}
