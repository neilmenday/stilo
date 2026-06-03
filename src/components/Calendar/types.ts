export type ContentBlockVariant = 'Default' | 'Span start' | 'Span middle' | 'Span end';
export type ContentBlockColor   = 'green' | 'orange' | 'blue' | 'violet';
export type CalendarDayState    = 'Active' | 'Inactive' | 'Weekend' | 'Blank' | 'Current day';

export interface CalendarEvent {
  label: string;
  color?: ContentBlockColor;
  onClick?: () => void;
}

export interface SpanEvent extends CalendarEvent {
  spanVariant?: ContentBlockVariant;
}

export interface CalendarEventMap {
  [dateKey: string]: {
    events?: CalendarEvent[];
    spanEvents?: SpanEvent[];
  };
}

export interface CalendarProps {
  initialYear?: number;
  initialMonth?: number;
  events?: CalendarEventMap;
  onDayClick?: (dateKey: string, dayNumber: number) => void;
}

export const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

export function buildWeeks(year: number, month: number): (number | null)[][] {
  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
}

export function isWeekendCol(di: number): boolean {
  return di === 5 || di === 6;
}
