import { useState, useRef } from 'react';

export function useHoverPopover<T extends HTMLElement = HTMLElement>() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<T>(null);
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
