import { useState, useRef } from 'react';

export function useInfoPopover() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const rectRef    = useRef<DOMRect | null>(null);

  const handleMouseEnter = () => {
    rectRef.current = triggerRef.current?.getBoundingClientRect() ?? null;
    setOpen(true);
  };

  return {
    open,
    triggerRef,
    rectRef,
    handleMouseEnter,
    handleMouseLeave: () => setOpen(false),
  };
}
