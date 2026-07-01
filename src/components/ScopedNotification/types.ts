import type { ReactNode } from 'react';

export type ScopedNotificationVariant = 'info' | 'warning' | 'error' | 'success' | 'light' | 'copyable';

export interface ScopedNotificationProps {
  variant?:     ScopedNotificationVariant;
  label?:       ReactNode;
  iconVisible?: boolean;
  onCopy?:      () => void;
}
