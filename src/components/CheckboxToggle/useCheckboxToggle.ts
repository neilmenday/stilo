import { useState } from 'react';
import type React from 'react';

interface UseCheckboxToggleOptions {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function useCheckboxToggle({ checked, onChange, disabled = false }: UseCheckboxToggleOptions) {
  const [focused, setFocused] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (!disabled) onChange(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClick();
    }
  };

  return {
    focused,
    hovered,
    handleClick,
    handleKeyDown,
    focusProps: {
      onFocus: () => setFocused(true),
      onBlur:  () => setFocused(false),
    },
    hoverProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
}
