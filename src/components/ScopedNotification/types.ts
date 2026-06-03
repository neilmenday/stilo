export type ScopedNotificationVariant = 'info' | 'warning' | 'error' | 'success' | 'light' | 'copyable';

export interface ScopedNotificationProps {
  variant?:     ScopedNotificationVariant;
  label?:       string;
  iconVisible?: boolean;
  onCopy?:      () => void;
}
