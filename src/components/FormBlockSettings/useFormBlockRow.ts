import { useState } from 'react';

// The second field stays inactive until the first has a value; a first field
// that starts with one (a prefilled value, a toggle on) counts from the start.
export function useFormBlockRow(primaryStartsWithValue = false) {
  const [primaryHasValue, setPrimaryHasValue] = useState(primaryStartsWithValue);
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
