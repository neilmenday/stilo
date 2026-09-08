import { useHoverPopover } from '../Popover/useHoverPopover';

export function useInfoPopover() {
  return useHoverPopover<HTMLButtonElement>();
}
