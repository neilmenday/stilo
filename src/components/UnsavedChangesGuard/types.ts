import type { InlineResponseVariant } from '../InlineResponse/types';

export type UnsavedChangesVariant = 'inline' | 'overlay';

export interface UnsavedChangesGuardProps {
  show: boolean;
  variant: UnsavedChangesVariant;
  onSave: () => void;
  onDiscard: () => void;
  onDismiss: () => void;
  responseMessage?: string;
  responseVariant?: InlineResponseVariant;
}
