import { useState, useMemo, useCallback } from 'react';
import type { CalendarEventMap, ContentBlockColor } from '../Calendar/types';
import { getSpanRange } from './types';

interface CalendarEventWithDate {
  label: string;
  color?: string;
  dateKey: string;
  isSpan: boolean;
  [key: string]: unknown;
}

interface UseCalendarViewOptions {
  events: CalendarEventMap;
  onEventsChange?: (events: CalendarEventMap) => void;
}

export function useCalendarView({ events, onEventsChange }: UseCalendarViewOptions) {
  const [editingEvent, setEditingEvent] = useState<CalendarEventWithDate | null>(null);
  const [editTitle,    setEditTitle]    = useState('');
  const [editColor,    setEditColor]    = useState<ContentBlockColor>('green');
  const [editDirty,    setEditDirty]    = useState(false);

  const editSpanRange = useMemo(() => {
    if (!editingEvent || !editingEvent.isSpan) return null;
    return getSpanRange(events, editingEvent.dateKey, editingEvent.color ?? 'green');
  }, [editingEvent, events]);

  const handleEventClick = useCallback((ev: CalendarEventWithDate) => {
    let label = ev.label;
    if (!label && ev.isSpan) {
      const { start } = getSpanRange(events, ev.dateKey, ev.color ?? 'green');
      label = events[start]?.spanEvents?.find(s => s.color === ev.color && s.label)?.label ?? '';
    }
    setEditTitle(label);
    setEditColor((ev.color as ContentBlockColor) ?? 'green');
    setEditingEvent({ ...ev, label });
    setEditDirty(false);
  }, [events]);

  const handleEditClose = () => setEditingEvent(null);

  const handleEditSave = () => {
    if (!editingEvent) return;
    const { dateKey, label: resolvedLabel, color: spanColor, isSpan } = editingEvent;

    let updated: CalendarEventMap;
    if (!isSpan) {
      const day = events[dateKey];
      if (!day) { handleEditClose(); return; }
      updated = {
        ...events,
        [dateKey]: {
          ...day,
          events: (day.events ?? []).map(ev =>
            ev.label === resolvedLabel ? { ...ev, label: editTitle, color: editColor } : ev
          ),
        },
      };
    } else {
      updated = {};
      Object.entries(events).forEach(([dk, dayData]) => {
        const spans = dayData.spanEvents ?? [];
        const hasRelated = spans.some(ev =>
          ev.color === spanColor && (ev.label === resolvedLabel || ev.label === '')
        );
        if (!hasRelated) { updated[dk] = dayData; return; }
        updated[dk] = {
          ...dayData,
          spanEvents: spans.map(ev =>
            ev.color === spanColor && (ev.label === resolvedLabel || ev.label === '')
              ? { ...ev, label: ev.spanVariant === 'Span start' ? editTitle : ev.label, color: editColor }
              : ev
          ),
        };
      });
    }

    onEventsChange?.(updated);
    handleEditClose();
  };

  return {
    editingEvent,
    editTitle,
    setEditTitle,
    editColor,
    setEditColor,
    editDirty,
    setEditDirty,
    editSpanRange,
    handleEventClick,
    handleEditClose,
    handleEditSave,
  };
}
