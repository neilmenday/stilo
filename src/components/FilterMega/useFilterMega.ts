import { useState, useRef, useEffect } from 'react';

interface UseFilterMegaOptions {
  valuesProp?: Record<string, string>;
  onChange?: (values: Record<string, string>) => void;
}

export function useFilterMega({ valuesProp, onChange }: UseFilterMegaOptions = {}) {
  const [open,            setOpen]           = useState(false);
  const [hovered,         setHovered]        = useState(false);
  const [internalValues,  setInternalValues] = useState<Record<string, string>>({});
  const [activeDateKey,   setActiveDateKey]  = useState<string | null>(null);

  const values = valuesProp !== undefined ? valuesProp : internalValues;
  const ref                  = useRef<HTMLDivElement>(null);
  const calendarContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-combobox-portal]')) return;
      if (ref.current && !ref.current.contains(target)) {
        setOpen(false);
        setActiveDateKey(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const setFieldValue = (key: string, value: string) => {
    const next = { ...values, [key]: value };
    if (valuesProp === undefined) setInternalValues(next);
    onChange?.(next);
  };

  const appliedCount = Object.values(values).filter(Boolean).length;
  const displayValue = appliedCount > 0
    ? `${appliedCount} filter${appliedCount > 1 ? 's' : ''} applied`
    : '';

  return {
    open,
    hovered,
    values,
    activeDateKey,
    ref,
    calendarContainerRef,
    displayValue,
    toggle: () => setOpen(v => !v),
    setFieldValue,
    setActiveDateKey,
    hoverProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
}
