import type { InlineResponseVariant } from '../InlineResponse/types';

export interface ModeSpaceProps {
  saveLabel?:       string;
  cancelLabel?:     string;
  saveDisabled?:    boolean;
  onSave?:          () => void;
  onCancel?:        () => void;
  responseMessage?: string;
  responseVariant?: InlineResponseVariant;
}
