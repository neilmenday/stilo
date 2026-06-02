export const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
export const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export const getDaysInMonth    = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
export const getFirstDayOfWeek = (y: number, m: number) => new Date(y, m, 1).getDay();

export const isSameDay = (a: Date | null, b: Date | null): boolean =>
  !!(a && b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth()    === b.getMonth()    &&
    a.getDate()     === b.getDate());

export const isInRange = (d: Date | null, from: Date | null, to: Date | null): boolean => {
  if (!from || !to || !d) return false;
  return d.getTime() > from.getTime() && d.getTime() < to.getTime();
};

export const formatDate = (d: Date | null): string => {
  if (!d) return '';
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
};

export const formatDateRange = (from: Date | null, to: Date | null): string => {
  if (!from) return '';
  if (!to)   return formatDate(from);
  if (from.getFullYear() === to.getFullYear()) {
    if (from.getMonth() === to.getMonth())
      return `${from.getDate()} – ${to.getDate()} ${MONTHS[to.getMonth()].slice(0, 3)} ${to.getFullYear()}`;
    return `${from.getDate()} ${MONTHS[from.getMonth()].slice(0, 3)} – ${to.getDate()} ${MONTHS[to.getMonth()].slice(0, 3)} ${to.getFullYear()}`;
  }
  return `${formatDate(from)} – ${formatDate(to)}`;
};

export type QuickRange = {
  label: string;
  getDates: () => [Date, Date];
};

export const DEFAULT_QUICK_RANGES: QuickRange[] = [
  { label: 'Today',          getDates: () => { const t = new Date(); return [t, t]; } },
  { label: 'Last 7 days',    getDates: () => { const e = new Date(), s = new Date(); s.setDate(e.getDate() - 6);       return [s, e]; } },
  { label: 'Last 30 days',   getDates: () => { const e = new Date(), s = new Date(); s.setDate(e.getDate() - 29);      return [s, e]; } },
  { label: 'Last 3 months',  getDates: () => { const e = new Date(), s = new Date(); s.setMonth(e.getMonth() - 3);     return [s, e]; } },
  { label: 'Last 12 months', getDates: () => { const e = new Date(), s = new Date(); s.setFullYear(e.getFullYear() - 1); return [s, e]; } },
];

export type CalendarCell = { day: number; date: Date; current: boolean };

export const buildCalendarGrid = (year: number, month: number): CalendarCell[] => {
  const firstDow    = getFirstDayOfWeek(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const prevMonDays = getDaysInMonth(year, month === 0 ? 11 : month - 1);

  return Array.from({ length: 42 }, (_, i) => {
    const idx = i - firstDow + 1;
    if (idx < 1) {
      const d = prevMonDays + idx;
      return { day: d, date: new Date(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, d), current: false };
    }
    if (idx > daysInMonth) {
      const d = idx - daysInMonth;
      return { day: d, date: new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, d), current: false };
    }
    return { day: idx, date: new Date(year, month, idx), current: true };
  });
};

export const buildYearList = (around: number, count = 20): number[] =>
  Array.from({ length: count }, (_, i) => around - 5 + i);
