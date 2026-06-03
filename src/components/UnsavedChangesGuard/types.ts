export type UnsavedChangesVariant = 'inline' | 'overlay';

export interface UnsavedChangesGuardProps {
  show: boolean;
  variant: UnsavedChangesVariant;
  onSave: () => void;
  onDiscard: () => void;
  onDismiss: () => void;
  message?: string;
}
