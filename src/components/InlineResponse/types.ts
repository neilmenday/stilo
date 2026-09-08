import type { ReactNode } from 'react';

/** Deliberate subset of ScopedNotificationVariant — 'light'/'copyable' are
 *  ScopedNotification display quirks, not action-outcome severities. */
export type InlineResponseVariant = 'info' | 'warning' | 'error' | 'success';

export interface InlineResponseProps {
  variant?:     InlineResponseVariant;
  message:      ReactNode;
  iconVisible?: boolean;
}
