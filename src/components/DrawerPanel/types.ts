import type React from 'react';

export interface DrawerPanelProps {
  title?:           string;
  titleAvatar?:     { src?: string; initials?: string };
  children?:        React.ReactNode;
  /** Presence of onSave and/or onCancel is what turns the built-in footer on
   *  (a nested FunctionsBar) — see hasBuiltInFooter in DrawerPanel.tsx. */
  onSave?:          () => void;
  onCancel?:        () => void;
  saveLabel?:       string;
  cancelLabel?:     string;
  saveDisabled?:    boolean;
  actions?:         React.ReactNode;
  width?:           number;
  onBackdropClick?: () => void;
  /** Set false to hide the built-in Save/Cancel (or actions) footer entirely. Defaults to true. */
  showFooter?:      boolean;
}
