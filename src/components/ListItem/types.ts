import type React from 'react';

export type ListItemVariant  = 'default' | 'identifier';
export type ListItemStatus   = 'active'  | 'inactive';
export type ListItemNameType = 'text'    | 'button';

export interface ListItemProps {
  variant?: ListItemVariant;

  // default variant
  label?:           string;
  colour?:          string;
  onColourChange?:  (hex: string) => void;
  isDragging?:      boolean;
  isFocused?:       boolean;
  showDragHandle?:  boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLDivElement>;

  // identifier variant
  name?:               string;
  nameType?:           ListItemNameType;
  onNameClick?:        () => void;
  showUsername?:       boolean;
  showStatus?:         boolean;
  status?:             ListItemStatus;
  onLabel?:            string;
  offLabel?:           string;
  showMeta?:           boolean;
  metaLabel?:          string;
  showIdentifierIcon?: boolean;
  identifierIconName?: string;
  identifierActive?:   boolean;
}
