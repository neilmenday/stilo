import { useState, useRef } from 'react';
import type React from 'react';
import { isSameDay, DEFAULT_QUICK_RANGES, QuickRange } from './utils';

export function useDatebox(rangeFrom: Date | null, rangeTo: Date | null) {
  const today = new Date();
  const [leftYear,    setLeftYear]    = useState(rangeFrom ? rangeFrom.getFullYear() : today.getFullYear());
  const [leftMonth,   setLeftMonth]   = useState(rangeFrom ? rangeFrom.getMonth()    : today.getMonth());
  const [hoverDate,   setHoverDate]   = useState<Date | null>(null);
  const [pickingFrom, setPickingFrom] = useState(!rangeFrom || !!rangeTo);
  const [quickRanges, setQuickRanges] = useState<QuickRange[]>(DEFAULT_QUICK_RANGES);
  const [draggingId,  setDraggingId]  = useState<string | null>(null);
  const [dragOverId,  setDragOverId]  = useState<string | null>(null);
  const [focusedId,   setFocusedId]   = useState<string | null>(null);
  const dragItem = useRef<string | null>(null);

  const rightMonth = leftMonth === 11 ? 0             : leftMonth + 1;
  const rightYear  = leftMonth === 11 ? leftYear + 1  : leftYear;

  const prevMonth = () => {
    if (leftMonth === 0) { setLeftMonth(11); setLeftYear(y => y - 1); }
    else setLeftMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (leftMonth === 11) { setLeftMonth(0); setLeftYear(y => y + 1); }
    else setLeftMonth(m => m + 1);
  };

  const handleDayClick = (
    date: Date,
    onChange: (p: { from: Date | null; to: Date | null }) => void,
  ) => {
    if (pickingFrom) {
      const keepTo = rangeTo && date < rangeTo ? rangeTo : null;
      onChange({ from: date, to: keepTo });
      setPickingFrom(false);
    } else {
      const from = rangeFrom;
      if (!from || date < from)           onChange({ from: date, to: from });
      else if (isSameDay(date, from))     onChange({ from: date, to: date });
      else                                onChange({ from, to: date });
    }
  };

  const handleQuickRange = (
    r: QuickRange,
    onChange: (p: { from: Date | null; to: Date | null }) => void,
    onClose: () => void,
  ) => {
    const [from, to] = r.getDates();
    onChange({ from, to });
    setLeftYear(from.getFullYear());
    setLeftMonth(from.getMonth());
    onClose();
  };

  const handleRangeDragStart = (_e: React.DragEvent, label: string) => {
    dragItem.current = label;
    setDraggingId(label);
  };
  const handleRangeDragEnter = (label: string) => {
    if (label !== dragItem.current) setDragOverId(label);
  };
  const handleRangeDragEnd = () => {
    if (dragItem.current && dragOverId) {
      setQuickRanges(prev => {
        const next = [...prev];
        const from = next.findIndex(i => i.label === dragItem.current);
        const to   = next.findIndex(i => i.label === dragOverId);
        const [moved] = next.splice(from, 1);
        next.splice(to, 0, moved);
        return next;
      });
    }
    dragItem.current = null;
    setDraggingId(null);
    setDragOverId(null);
  };

  return {
    leftYear, setLeftYear, leftMonth, setLeftMonth,
    rightYear, rightMonth,
    hoverDate, setHoverDate,
    pickingFrom, setPickingFrom,
    quickRanges,
    draggingId, dragOverId, focusedId, setFocusedId,
    prevMonth, nextMonth,
    handleDayClick, handleQuickRange,
    handleRangeDragStart, handleRangeDragEnter, handleRangeDragEnd,
  };
}
