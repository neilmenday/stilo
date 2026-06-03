import { useState, useRef, useEffect } from 'react';
import type { SearchVariant } from './types';

interface UseSearchOptions {
  variant?: SearchVariant;
  onChange?: (value: string) => void;
}

export function useSearch({ variant = 'Default', onChange }: UseSearchOptions = {}) {
  const [inputValue, setInputValue] = useState(variant === 'Searched' ? 'Searched' : '');
  const [isFocused,  setIsFocused]  = useState(false);
  const [isHovered,  setIsHovered]  = useState(false);
  const [pills,      setPills]      = useState([{ id: 1, label: 'Label' }, { id: 2, label: 'Label' }]);
  const [pillInput,  setPillInput]  = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(variant === 'Searched' ? 'Searched' : '');
    setIsFocused(false);
    setPillInput('');
  }, [variant]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onChange?.(value);
  };

  const clearInput = () => {
    setInputValue('');
    onChange?.('');
    inputRef.current?.focus();
  };

  const addPill = () => {
    const val = pillInput.trim();
    if (!val) return;
    setPills(prev => [...prev, { id: Date.now(), label: val }]);
    setPillInput('');
  };

  const removePill = (id: number) => setPills(prev => prev.filter(p => p.id !== id));

  return {
    inputValue,
    isFocused,
    isHovered,
    pills,
    pillInput,
    setPillInput,
    inputRef,
    handleInputChange,
    clearInput,
    addPill,
    removePill,
    focusProps: {
      onFocus: () => setIsFocused(true),
      onBlur:  () => setIsFocused(false),
    },
    hoverProps: {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    },
  };
}
