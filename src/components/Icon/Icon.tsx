import React from 'react';
import { useIconRegistry } from './IconContext';
import type { IconProps } from './types';

export function Icon({ name, size = 16, label }: IconProps) {
  const registry = useIconRegistry();
  const render = registry[name];
  if (!render) return null;
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ display: 'inline-flex', flexShrink: 0 }}
    >
      {render(size)}
    </span>
  );
}
