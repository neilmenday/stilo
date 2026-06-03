import { useState, useRef, useCallback } from 'react';

interface UseCodeTextareaOptions {
  value?: string;
}

export function useCodeTextarea({ value = '' }: UseCodeTextareaOptions = {}) {
  const [scrollTop, setScrollTop] = useState(0);
  const [copied,    setCopied]    = useState(false);
  const [focused,   setFocused]   = useState(false);
  const [hovered,   setHovered]   = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleScroll = useCallback(() => {
    if (textareaRef.current) setScrollTop(textareaRef.current.scrollTop);
  }, []);

  const handleCopy = useCallback(() => {
    if (!value) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [value]);

  return {
    scrollTop,
    copied,
    focused,
    hovered,
    textareaRef,
    handleScroll,
    handleCopy,
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
