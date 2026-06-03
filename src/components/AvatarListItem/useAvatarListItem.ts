import { useState, useRef, useEffect } from 'react';

interface UseAvatarListItemOptions {
  identifierActive?: boolean;
  showIdentifierIcon?: boolean;
  onNameClick?: () => void;
}

export function useAvatarListItem({ identifierActive, showIdentifierIcon, onNameClick }: UseAvatarListItemOptions) {
  const [nameHovered, setNameHovered] = useState(false);
  const [isClicked,   setIsClicked]   = useState(false);
  const prevActiveRef = useRef(identifierActive);

  useEffect(() => {
    if (prevActiveRef.current && !identifierActive) setIsClicked(false);
    prevActiveRef.current = identifierActive;
  }, [identifierActive]);

  const handleNameClick = () => {
    if (showIdentifierIcon) setIsClicked(true);
    onNameClick?.();
  };

  return {
    iconVisible: nameHovered || isClicked || !!identifierActive,
    handleNameClick,
    nameHoverProps: {
      onMouseEnter: () => setNameHovered(true),
      onMouseLeave: () => setNameHovered(false),
    },
  };
}
