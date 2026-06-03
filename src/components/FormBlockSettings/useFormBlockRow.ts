import { useState } from 'react';

export function useFormBlockRow() {
  const [primaryHasValue, setPrimaryHasValue] = useState(false);
  const [toggleStates,    setToggleStates]    = useState([false, false]);

  const setToggle = (idx: number, v: boolean) => {
    setToggleStates(prev => { const next = [...prev]; next[idx] = v; return next; });
  };

  return {
    primaryHasValue,
    setPrimaryHasValue,
    toggleStates,
    setToggle,
  };
}
