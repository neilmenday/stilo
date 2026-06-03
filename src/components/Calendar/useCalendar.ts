import { useState } from 'react';

interface UseCalendarOptions {
  initialYear?: number;
  initialMonth?: number;
}

export function useCalendar({ initialYear, initialMonth }: UseCalendarOptions = {}) {
  const today = new Date();
  const [year,  setYear]  = useState(initialYear  ?? today.getFullYear());
  const [month, setMonth] = useState(initialMonth ?? today.getMonth());

  const prevMonth = () => {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  };

  return { year, month, today, prevMonth, nextMonth };
}
