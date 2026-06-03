import type { ReactElement } from 'react';

/** Renders a single icon at a given size. Uses currentColor for fill. */
export type IconEntry = (size: number) => ReactElement;

/** Maps icon names to their render functions. */
export type IconRegistry = Record<string, IconEntry>;

export interface IconProps {
  name: string;
  size?: number;
  label?: string;
}

export interface IconProviderProps {
  /** Icons to add or override. */
  icons: Partial<IconRegistry>;
  children: ReactElement | ReactElement[];
  /** true (default): merge with parent registry. false: replace entirely. */
  merge?: boolean;
}
