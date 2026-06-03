import { useState, useRef, useEffect } from 'react';

interface UseInfoListItemOptions {
  identifierActive?: boolean;
  onIdentifierClick?: () => void;
}

export function useInfoListItem({ identifierActive, onIdentifierClick }: UseInfoListItemOptions = {}) {
  const [isSelected,  setIsSelected]  = useState(false);
  const prevActiveRef = useRef(identifierActive);

  useEffect(() => {
    if (prevActiveRef.current && !identifierActive) setIsSelected(false);
    prevActiveRef.current = identifierActive;
  }, [identifierActive]);

  const handleIdentifierClick = () => {
    setIsSelected(true);
    onIdentifierClick?.();
  };

  return { isSelected, handleIdentifierClick };
}
