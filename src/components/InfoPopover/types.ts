export type { PopoverVariant } from '../Popover/types';
import type { PopoverVariant } from '../Popover/types';

export interface InfoPopoverProps {
  title?:   string;
  body?:    string;
  variant?: PopoverVariant;
  // Dims the icon to match a disabled host field/control — the icon
  // otherwise renders in currentColor and ignores the host's own state.
  disabled?: boolean;
}
