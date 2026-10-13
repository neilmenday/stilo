import { useState, useRef, useEffect } from 'react';

// Opens on hover of the trigger. With `closeDelay` (ms), leaving the trigger
// waits before closing, and entering the popover itself (handlePopoverMouseEnter)
// keeps it open - so a popover with interactive content can be reached.
export function useHoverPopover<T extends HTMLElement = HTMLElement>({ closeDelay = 0 }: { closeDelay?: number } = {}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<T>(null);
  const rectRef    = useRef<DOMRect | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };
  const scheduleClose = () => {
    cancelClose();
    if (closeDelay > 0) closeTimer.current = setTimeout(() => setOpen(false), closeDelay);
    else setOpen(false);
  };

  useEffect(() => cancelClose, []);

  const handleMouseEnter = () => {
    cancelClose();
    rectRef.current = triggerRef.current?.getBoundingClientRect() ?? null;
    setOpen(true);
  };

  return {
    open,
    triggerRef,
    rectRef,
    handleMouseEnter,
    handleMouseLeave: scheduleClose,
    handlePopoverMouseEnter: cancelClose,
    handlePopoverMouseLeave: scheduleClose,
  };
}
