import type React from 'react';

export interface BoxProps {
  title?:    string;
  pill?:     string;
  action?:   string;
  onAction?: () => void;
  children?: React.ReactNode;
  /** Id on the box, so a link can point at it. */
  anchorId?: string;
  /** The box a link points at: it scrolls into view and is marked for the
   *  extension to highlight. */
  linked?: boolean;
}
