import { useState } from 'react';

export function useNavItem() {
  const [hovered, setHovered] = useState(false);

  return {
    hovered,
    hoverProps: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
}
