import { useState } from 'react';

interface UseButtonGroupOptions {
  onChange?: (index: number) => void;
}

export function useButtonGroup({ onChange }: UseButtonGroupOptions = {}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (i: number) => {
    setActiveIndex(i);
    onChange?.(i);
  };

  return { activeIndex, handleClick };
}
