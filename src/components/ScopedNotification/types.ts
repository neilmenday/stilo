import type { ReactNode } from 'react';

export type ScopedNotificationVariant = 'info' | 'warning' | 'error' | 'success' | 'light' | 'copyable';

export interface ScopedNotificationProps {
  variant?:     ScopedNotificationVariant;
  label?:       ReactNode;
  iconVisible?: boolean;
  onCopy?:      () => void;
  /** A link at the end of the message - the Action in 'Statement. Consequence. Action.' */
  actionLabel?: string;
  onAction?:    () => void;
}
