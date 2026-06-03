import { useState } from 'react';
import type React from 'react';

interface UseCheckboxOptions {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export function useCheckbox({ checked = false, onChange, disabled = false }: UseCheckboxOptions) {
  const [focused,          setFocused]          = useState(false);
  const [internalChecked,  setInternalChecked]  = useState(checked);

  const isControlled    = onChange !== undefined;
  const resolvedChecked = isControlled ? checked : internalChecked;

  const handleClick = () => {
    if (!disabled) {
      if (isControlled) onChange!(!resolvedChecked);
      else setInternalChecked(v => !v);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === ' ' || e.key === 'Enter') && !disabled) {
      e.preventDefault();
      if (isControlled) onChange!(!resolvedChecked);
      else setInternalChecked(v => !v);
    }
  };

  return {
    focused,
    resolvedChecked,
    handleClick,
    handleKeyDown,
    focusProps: {
      onFocus: () => setFocused(true),
      onBlur:  () => setFocused(false),
    },
  };
}
