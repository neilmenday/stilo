import type React from 'react';
import type { GridCardSupportingInfo } from '../GridCard/types';

export interface GridItem {
  id:               string | number;
  title:            string;
  metaLabel?:       string;
  status?:          'active' | 'inactive';
  mapCenter?:       [number, number];
  mapZoom?:         number;
  dotMenuItems?:    string[];
  onDotMenuSelect?: (index: number, label: string) => void;
  /** cardVariant 'grid': the GridCard's supporting info and content. */
  supportingInfo?:  GridCardSupportingInfo;
  content?:         React.ReactNode;
  [key: string]: unknown;
}

export interface ControllableGridSetProps {
  items: GridItem[];
  drawerWidth?:         number;
  panelTitle?:          (item: GridItem) => string;
  renderEditWorkflow?:  (item: GridItem, open: boolean, onClose: () => void) => React.ReactNode;
  searchLabel?: string;
  bulkLabel?: string;
  bulkItems?: { value: string; label: string }[];
  buttonLabel?:   string;
  onButtonClick?: () => void;
  showHistory?:    boolean;
  historyLabel?:   string;
  onHistoryClick?: () => void;
  content?:        string;
  contentVariant?: string;
  /** 'territory' (default): map cards that open the territory drawer;
   *  'grid': GridCards (title, supporting info, content). */
  cardVariant?:    'territory' | 'grid';
  /** A card click runs this instead of opening the edit drawer (e.g. navigate to the item). */
  onItemClick?:    (item: GridItem) => void;
}
