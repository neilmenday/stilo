import React, { useContext } from 'react';
import { IconContext } from './IconContext';
import type { IconProviderProps } from './types';

export function IconProvider({ icons, children, merge = true }: IconProviderProps) {
  const parent = useContext(IconContext);
  const registry: typeof parent = merge
    ? { ...parent, ...icons } as typeof parent
    : icons as typeof parent;
  return (
    <IconContext.Provider value={registry}>
      {children}
    </IconContext.Provider>
  );
}
