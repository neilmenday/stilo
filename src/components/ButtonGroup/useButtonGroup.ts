import { useState } from 'react';

interface UseButtonGroupOptions {
  onChange?: (index: number) => void;
  /** Controlled active index; the group's own state is used when absent. */
  activeIndex?: number;
}

export function useButtonGroup({ onChange, activeIndex: controlled }: UseButtonGroupOptions = {}) {
  const [ownIndex, setOwnIndex] = useState(controlled ?? 0);

  const handleClick = (i: number) => {
    setOwnIndex(i);
    onChange?.(i);
  };

  return { activeIndex: controlled ?? ownIndex, handleClick };
}
