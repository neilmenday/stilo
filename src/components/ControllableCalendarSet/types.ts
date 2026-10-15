import type { FilterField } from '../FilterMega/types';
import type React from 'react';
import type { CalendarEventMap, CalendarEvent } from '../Calendar/types';

export type CalendarSetVariant = 'drawer' | 'overlay';

export interface CalendarEventWithDate extends CalendarEvent {
  dateKey: string;
  isSpan:  boolean;
}

export interface ControllableCalendarSetProps {
  events?:       CalendarEventMap;
  /** More Filter fields after the built-in colour one (e.g. Team); the chosen values come back through onFilterChange. */
  /** Show the ActionsSet (filter, search, actions) above the calendar. Defaults to true. */
  showActions?: boolean;
  extraFilterFields?: FilterField[];
  onFilterChange?:    (values: Record<string, string>) => void;
  initialYear?:  number;
  initialMonth?: number;
  variant?:            CalendarSetVariant;
  panelTitle?:         (event: CalendarEventWithDate) => string;
  renderPanelContent?: (event: CalendarEventWithDate, onClose: () => void) => React.ReactNode;
  onPanelSave?:        (event: CalendarEventWithDate) => void;
  drawerWidth?:        number;
  overlayWidth?:       number;
  tabs?:        { id: string; label: string }[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  onDayClick?: (dateKey: string, dayNumber: number) => void;
  /** Makes events editable: clicking one opens the set's event edit drawer, and edits come back here. */
  onEventsChange?: (events: CalendarEventMap) => void;
  onEventClick?: (event: CalendarEventWithDate) => void;
  searchLabel?:          string;
  buttonLabel?:          string;
  onButtonClick?:        () => void;
  bulkLabel?:            string;
  bulkItems?:            { value: string; label: string }[];
  showHistory?:          boolean;
  historyLabel?:         string;
  onHistoryClick?:       () => void;
  filterPanelWidth?:     number;
  renderFilterResponse?: (values: Record<string, string>) => React.ReactNode;
}
