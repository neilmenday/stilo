import type React from 'react';
import type { ExpandableBoxVariant } from '../ExpandableBox/types';

export interface FormBlockExpandableProps {
  title?: string;
  variant?: ExpandableBoxVariant;
  defaultOpen?: boolean;
  showPill?: boolean;
  pillLabel?: string;
  showDotmenu?: boolean;
  children?: React.ReactNode;
  onChange?: (value: boolean) => void;
  /** Id on the block, so a link can point at it. */
  anchorId?: string;
  /** The block a link points at: it scrolls into view, opens (a checkable
   *  block stays as it is - open there means switched on) and is marked
   *  `data-linked` for the extension to highlight. */
  linked?: boolean;
}
