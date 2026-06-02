import { useState, useRef, useEffect } from 'react';
import type React from 'react';
import { isSameDay, formatDate, formatDateRange } from './utils';

export type DatePickerVariant = 'Date' | 'Date range' | 'Datetime' | 'Datetime range' | 'Time';

export interface UseDatePickerOptions {
  variant?:            DatePickerVariant;
  onChange?:           (value: string) => void;
  calendarContainer?:  React.RefObject<HTMLElement>;
  onOpenChange?:       (open: boolean) => void;
  initialFrom?:        Date;
  initialTo?:          Date;
}

export function useDatePicker({
  variant = 'Date range',
  onChange,
  calendarContainer,
  onOpenChange,
  initialFrom,
  initialTo,
}: UseDatePickerOptions) {
  const [isOpen,      setIsOpen]      = useState(false);
  const [rangeFrom,   setRangeFrom]   = useState<Date | null>(initialFrom ?? null);
  const [rangeTo,     setRangeTo]     = useState<Date | null>(initialTo   ?? null);
  const [fromTime,    setFromTime]    = useState('00:00');
  const [toTime,      setToTime]      = useState('00:00');
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeCalendar = () => { setIsOpen(false); onOpenChange?.(false); };

  const openCalendar = () => {
    if (wrapperRef.current) {
      const rect       = wrapperRef.current.getBoundingClientRect();
      const DATEBOX_W  = 780;
      const MARGIN     = 8;
      const flipped    = window.innerWidth - rect.left < DATEBOX_W;
      const rawLeft    = flipped ? rect.right - DATEBOX_W : rect.left;
      const clampedLeft = Math.max(MARGIN, Math.min(rawLeft, window.innerWidth - DATEBOX_W - MARGIN));
      setDropdownPos({ top: rect.bottom + 2, left: clampedLeft });
    }
    setIsOpen(true);
    onOpenChange?.(true);
  };

  const toggleCalendar = () => (isOpen ? closeCalendar() : openCalendar());

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const inWrapper  = wrapperRef.current?.contains(e.target as Node);
      const inDropdown = dropdownRef.current?.contains(e.target as Node);
      const inCalendar = calendarContainer?.current?.contains(e.target as Node);
      if (!inWrapper && !inDropdown && !inCalendar) closeCalendar();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarContainer]);

  const handleChange = ({ from, to }: { from: Date | null; to: Date | null }) => {
    setRangeFrom(from);
    setRangeTo(to);
    if (variant === 'Date') {
      closeCalendar();
      onChange?.(from ? formatDate(from) : '');
    } else if (to) {
      onChange?.(from ? formatDateRange(from, to) : '');
    }
  };

  const dateValue = variant === 'Date'
    ? (rangeFrom ? formatDate(rangeFrom) : null)
    : (rangeFrom ? formatDateRange(rangeFrom, rangeTo) : null);

  return {
    isOpen, rangeFrom, rangeTo, fromTime, toTime,
    dropdownPos, wrapperRef, dropdownRef,
    dateValue, toggleCalendar, closeCalendar, handleChange,
    setFromTime, setToTime,
  };
}
