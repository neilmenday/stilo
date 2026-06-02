import { useState, useRef, useEffect } from 'react';

export function useCalendarMonth() {
  const [showYearDrop, setShowYearDrop] = useState(false);
  const yearRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (yearRef.current && !yearRef.current.contains(e.target as Node)) setShowYearDrop(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return { showYearDrop, setShowYearDrop, yearRef };
}
