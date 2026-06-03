import { useState } from 'react';

interface UseRadioGroupOptions {
  valueProp?: string;
  onChange?: (value: string) => void;
}

export function useRadioGroup({ valueProp, onChange }: UseRadioGroupOptions = {}) {
  const [internalValue, setInternalValue] = useState<string | undefined>(valueProp);
  const value = internalValue;

  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  return { value, handleChange };
}

interface UseRadioButtonOptions {
  focused?: boolean;
}

export function useRadioButton() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  return {
    hovered,
    focused,
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
