import { createContext, useContext } from 'react';
import type { IconRegistry } from './types';
import { defaultIcons } from './defaultIcons';

export const IconContext = createContext<IconRegistry>(defaultIcons);

export const useIconRegistry = () => useContext(IconContext);
