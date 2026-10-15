import { useState, useMemo, useEffect } from 'react';
import type { CalendarEventMap, CalendarEvent } from '../Calendar/types';
import type { CalendarEventWithDate } from './types';
import type { FilterField } from '../FilterMega/types';

interface UseControllableCalendarSetOptions {
  events: CalendarEventMap;
  variant?: string;
  onEventClick?: (event: CalendarEventWithDate) => void;
  onPanelSave?: (event: CalendarEventWithDate) => void;
  onDayClick?: (dateKey: string, dayNumber: number) => void;
  /** More filter fields, after the built-in colour one (e.g. Team). The hook
   *  doesn't filter events by these - the consumer reads the chosen values
   *  (filterMegaValues) and passes the events to show. */
  extraFilterFields?: FilterField[];
}

export function useControllableCalendarSet({
  events,
  variant,
  onEventClick,
  onPanelSave,
  onDayClick,
  extraFilterFields = [],
}: UseControllableCalendarSetOptions) {
  const [searchText,       setSearchText]       = useState('');
  const [filterValue,      setFilterValue]      = useState<string | null>(null);
  const [filterMegaValues, setFilterMegaValues] = useState<Record<string, string>>({});
  const [selected,         setSelected]         = useState<CalendarEventWithDate | null>(null);
  const [isDirty,          setIsDirty]          = useState(false);

  useEffect(() => { setIsDirty(false); }, [selected]);

  const onClose    = () => setSelected(null);
  const handleSave = () => { onPanelSave?.(selected!); onClose(); };

  const filterFields = useMemo(() => {
    const colors = new Set<string>();
    Object.values(events).forEach(day => {
      day.events?.forEach(ev => { if (ev.color) colors.add(ev.color); });
      day.spanEvents?.forEach(ev => { if (ev.color) colors.add(ev.color); });
    });
    if (colors.size === 0) return extraFilterFields;
    const colorLabels: Record<string, string> = {
      green: 'Working', orange: 'Out of office', blue: 'Holiday', violet: 'Meeting',
    };
    return [{
      key:   'color',
      label: 'Color',
      type:  'combobox' as const,
      items: Array.from(colors).map(v => ({ value: v, label: colorLabels[v] ?? v.charAt(0).toUpperCase() + v.slice(1) })),
    }, ...extraFilterFields];
  }, [events, extraFilterFields]);

  const clearAllFilters = () => { setFilterValue(null); setFilterMegaValues({}); };

  const enrichedEvents = useMemo<CalendarEventMap>(() => {
    const matchEvent = (ev: CalendarEvent): boolean => {
      if (searchText.trim() && !ev.label.toLowerCase().includes(searchText.toLowerCase())) return false;
      // One field: the combobox value; several: the FilterMega panel's colour.
      const color = filterValue ?? filterMegaValues.color;
      if (color && ev.color !== color) return false;
      return true;
    };
    const sortedKeys = Object.keys(events).sort((a, b) => {
      const [ay, am, ad] = a.split('-').map(Number);
      const [by, bm, bd] = b.split('-').map(Number);
      return new Date(ay, am - 1, ad).getTime() - new Date(by, bm - 1, bd).getTime();
    });
    const spanLabelByColor: Record<string, string> = {};
    const result: CalendarEventMap = {};
    sortedKeys.forEach(dateKey => {
      const dayData = events[dateKey];
      const evs = (dayData.events ?? []).filter(matchEvent).map(ev => ({
        ...ev,
        onClick: variant
          ? () => setSelected({ ...ev, dateKey, isSpan: false })
          : onEventClick ? () => onEventClick({ ...ev, dateKey, isSpan: false }) : ev.onClick,
      }));
      const spans = (dayData.spanEvents ?? [])
        .map(ev => { const ck = ev.color ?? 'green'; if (ev.label) spanLabelByColor[ck] = ev.label; return { ...ev, label: ev.label || spanLabelByColor[ck] || '' }; })
        .filter(matchEvent)
        .map(ev => ({
          ...ev,
          onClick: variant
            ? () => setSelected({ ...ev, dateKey, isSpan: true })
            : onEventClick ? () => onEventClick({ ...ev, dateKey, isSpan: true }) : ev.onClick,
        }));
      if (evs.length > 0 || spans.length > 0) {
        result[dateKey] = { events: evs, spanEvents: spans };
      }
    });
    return result;
  }, [events, searchText, filterValue, filterMegaValues.color, variant, onEventClick]);

  return {
    searchText,
    setSearchText,
    filterValue,
    setFilterValue,
    filterMegaValues,
    setFilterMegaValues,
    selected,
    setSelected,
    isDirty,
    setIsDirty,
    onClose,
    handleSave,
    filterFields,
    clearAllFilters,
    enrichedEvents,
  };
}
