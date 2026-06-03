export interface ModeSpaceProps {
  saveLabel?:    string;
  cancelLabel?:  string;
  saveDisabled?: boolean;
  onSave?:       () => void;
  onCancel?:     () => void;
  notification?: string;
}
