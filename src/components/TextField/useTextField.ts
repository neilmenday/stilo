import { useState } from 'react';
import type React from 'react';

interface UseTextFieldOptions {
  value?: string;
  onChange?: (v: string) => void;
  disabled?: boolean;
  forcedState?: string;
}

export function useTextField({ value, onChange, disabled = false, forcedState }: UseTextFieldOptions = {}) {
  const [hovered,     setHovered]     = useState(false);
  const [focused,     setFocused]     = useState(false);
  const [internalVal, setInternalVal] = useState('');

  const controlled = value !== undefined;
  const inputVal   = controlled ? value! : internalVal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!controlled) setInternalVal(e.target.value);
    onChange?.(e.target.value);
  };

  const isActiveInteraction =
    forcedState === 'Hover'  ||
    forcedState === 'Focus'  ||
    forcedState === 'Press'  ||
    (!forcedState && (hovered || focused));

  return {
    inputVal,
    isActiveInteraction,
    handleChange,
    hoverProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
    focusProps: {
      onFocus: () => setFocused(true),
      onBlur:  () => setFocused(false),
    },
  };
}
