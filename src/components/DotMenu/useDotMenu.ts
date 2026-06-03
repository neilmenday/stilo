import { useState, useRef, useEffect } from 'react';

interface UseDotMenuOptions {
  items: string[];
  onSelect?: (index: number, label: string) => void;
}

export function useDotMenu({ items, onSelect }: UseDotMenuOptions) {
  const [isOpen,        setIsOpen]        = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleSelect = (item: { value: string; label: string }) => {
    setSelectedValue(item.value);
    const idx = items.indexOf(item.label);
    onSelect?.(idx, item.label);
    setIsOpen(false);
  };

  return {
    isOpen,
    selectedValue,
    wrapperRef,
    toggle: () => setIsOpen(v => !v),
    handleSelect,
  };
}
