export type ToastVariant = 'Success' | 'Error' | 'Warning' | 'Info';

export interface ToastProps {
  variant?: ToastVariant;
  message?: string;
  showIcon?: boolean;
  dismissable?: boolean;
  onDismiss?: () => void;
}
