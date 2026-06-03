import { useState } from 'react';
import type { ExpandableBoxVariant } from './types';

interface UseExpandableBoxOptions {
  variant?: ExpandableBoxVariant;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onChange?: (value: boolean) => void;
}

export function useExpandableBox({ variant = 'default', isOpen: controlledOpen, defaultOpen = false, onChange }: UseExpandableBoxOptions = {}) {
  const isCheckable  = variant === 'checkable' || variant === 'inset-checkable';
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [checked,      setChecked]      = useState(false);

  const isOpen = controlledOpen !== undefined
    ? controlledOpen
    : (isCheckable ? checked : internalOpen);

  const toggle = () => {
    if (isCheckable) {
      const next = !checked;
      setChecked(next);
      onChange?.(next);
    } else {
      const next = controlledOpen !== undefined ? !controlledOpen : !internalOpen;
      setInternalOpen(next);
      onChange?.(next);
    }
  };

  return { isOpen, checked, toggle };
}
