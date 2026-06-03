import type React from 'react';

export type ExpandableBoxVariant =
  | 'default'
  | 'inset'
  | 'checkable'
  | 'inset-checkable'
  | 'link';

export interface ExpandableBoxProps {
  variant?: ExpandableBoxVariant;
  title?: string;
  isOpen?: boolean;
  defaultOpen?: boolean;
  showPill?: boolean;
  showDotmenu?: boolean;
  showDragHandle?: boolean;
  pillLabel?: string;
  linkLabel?: string;
  children?: React.ReactNode;
  onChange?: (value: boolean) => void;
}

export interface NestedExpandableBoxProps {
  title?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}
