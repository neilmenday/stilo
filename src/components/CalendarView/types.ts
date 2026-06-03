import type React from 'react';
import type { CalendarEventMap, ContentBlockColor } from '../Calendar/types';

export interface CalendarViewProps {
  teams?:           string[];
  selectedTeam?:    string;
  navItems?:        string[];
  activeNavItem?:   string;
  onNavChange?:     (item: string) => void;
  breadcrumbItems?: { label: string; onClick?: () => void }[];
  chooserLabel?:    string;
  avatarListItem?:  Record<string, unknown>;
  title:                   string;
  onHelpClick?:            () => void;
  showHeaderChooser?:      boolean;
  headerChooserLabel?:     string;
  headerChooserDisplayValue?:  string;
  headerChooserItems?:     { value: string; label: string }[];
  onHeaderChooserSelect?:  (item: { value: string; label: string }) => void;
  buttonLabel?:            string;
  events?:          CalendarEventMap;
  onEventsChange?:  (events: CalendarEventMap) => void;
  onButtonClick?:   () => void;
  onDayClick?:      (dateKey: string, dayNumber: number) => void;
  initialYear?:     number;
  initialMonth?:    number;
  header?: React.ReactNode;
}

export function parseKeyMs(key: string): number {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d).getTime();
}

export function dateKeyToDate(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function getSpanRange(
  events: CalendarEventMap,
  dateKey: string,
  color: string,
): { start: string; end: string } {
  const spanKeys = Object.keys(events)
    .filter(k => events[k].spanEvents?.some(ev => ev.color === color))
    .sort((a, b) => parseKeyMs(a) - parseKeyMs(b));

  const idx = spanKeys.indexOf(dateKey);
  if (idx === -1) return { start: dateKey, end: dateKey };

  let start = idx;
  while (start > 0) {
    const prevSpan = events[spanKeys[start - 1]].spanEvents?.find(ev => ev.color === color);
    if (prevSpan?.spanVariant === 'Span end' || prevSpan?.spanVariant === 'Span start') break;
    start--;
  }
  while (start > 0) {
    const cur = events[spanKeys[start]].spanEvents?.find(ev => ev.color === color);
    if (cur?.spanVariant === 'Span start') break;
    start--;
  }

  let end = idx;
  while (end < spanKeys.length - 1) {
    const cur = events[spanKeys[end]].spanEvents?.find(ev => ev.color === color);
    if (cur?.spanVariant === 'Span end') break;
    end++;
  }

  return { start: spanKeys[start], end: spanKeys[end] };
}
