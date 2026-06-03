import { useState } from 'react';

export function useTextarea() {
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
