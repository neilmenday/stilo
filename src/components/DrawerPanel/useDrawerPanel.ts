import { useState, useEffect } from 'react';

export function useDrawerPanel() {
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const animateClose = (callback?: () => void) => {
    setExiting(true);
    setTimeout(() => callback?.(), 220);
  };

  const isOpen = entered && !exiting;

  return { isOpen, animateClose };
}
