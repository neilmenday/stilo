export interface CheckboxBoundProps {
  checked?: boolean;
  focused?: boolean;
  disabled?: boolean;
  style?: Record<string, unknown>;
}

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  showLabel?: boolean;
  showInfo?: boolean;
  infoTitle?: string;
  infoBody?: string;
  disabled?: boolean;
  id?: string;
  /** 'title-large': a 20px title as the label (e.g. a summary card's title, so clicking it checks the box). */
  variant?: 'default' | 'title' | 'title-large';
  // Lets the label wrap onto multiple lines instead of the default
  // single-line/nowrap behaviour — box top-aligns against the first line.
  wrapLabel?: boolean;
}
