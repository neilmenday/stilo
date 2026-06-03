import type React from 'react';

export interface TerritoryCardProps {
  title:            string;
  checked?:         boolean;
  onCheck?:         (checked: boolean) => void;
  metaLabel?:       string;
  status?:          'active' | 'inactive';
  mapCenter?:       [number, number];
  mapZoom?:         number;
  mapContent?:      React.ReactNode;
  onExpand?:        () => void;
  onCardClick?:     () => void;
  dotMenuItems?:    string[];
  onDotMenuSelect?: (index: number, label: string) => void;
}
