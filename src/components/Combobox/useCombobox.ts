import { useState, useRef, useEffect } from 'react';
import type { ComboboxItem } from './types';

interface UseComboboxOptions {
  listVariant?: string;
  items?: ComboboxItem[];
  displayValue?: string;
  onSelect?: (item: ComboboxItem) => void;
  onMultiSelect?: (values: string[]) => void;
}

export function useCombobox({ listVariant = 'list', items = [], displayValue: displayValueProp, onSelect, onMultiSelect }: UseComboboxOptions = {}) {
  const [open,           setOpen]           = useState(false);
  const [selectedValue,  setSelectedValue]  = useState<string | null>(null);
  const [selectedLabel,  setSelectedLabel]  = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [portalPos,      setPortalPos]      = useState({ top: 0, left: 0, width: 0 });
  const ref         = useRef<HTMLDivElement>(null);
  const triggerRef  = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isMulti = listVariant === 'multi-select' || listVariant === 'multi-select-sections';

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        ref.current && !ref.current.contains(e.target as Node) &&
        (!dropdownRef.current || !dropdownRef.current.contains(e.target as Node))
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleToggle = () => {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPortalPos({ top: rect.bottom + 2, left: rect.left, width: rect.width });
    }
    setOpen(o => !o);
  };

  const internalDisplay = isMulti
    ? (selectedValues.length > 0 ? `${selectedValues.length} selected` : '')
    : selectedLabel || '';
  const displayValue = displayValueProp !== undefined ? displayValueProp : internalDisplay;

  const handleSelect = (item: ComboboxItem) => {
    setSelectedValue(item.value);
    setSelectedLabel(item.label);
    setOpen(false);
    onSelect?.(item);
  };

  const handleMultiSelect = (vals: string[]) => {
    setSelectedValues(vals);
    onMultiSelect?.(vals);
  };

  return {
    open,
    selectedValue,
    selectedValues,
    portalPos,
    displayValue,
    ref,
    triggerRef,
    dropdownRef,
    handleToggle,
    handleSelect,
    handleMultiSelect,
  };
}
