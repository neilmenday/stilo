import type React from 'react';
import type { GridCardSupportingInfo, GridCardVariant } from '../GridCard/types';
import type { AvatarRowProps } from '../AvatarRow/types';

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
  /** cardVariant 'grid': the GridCard variant and its summary-variant parts. */
  gridCardVariant?: GridCardVariant;
  avatars?:         AvatarRowProps;
  summaryLink?:     { label: string; onClick?: () => void; popoverTitle?: string; popoverItems?: string[] };
  summaryText?:     string;
  hasProblem?:      boolean;
  [key: string]: unknown;
}

export interface ControllableGridSetProps {
  /** View options (Grid / List), on by default; false for a grid-only view.
   *  The list keeps the same information: title (identifier), members (avatars)
   *  and the summary as columns. */
  showViewOptions?:  boolean;
  viewMode?:         'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  /** Which grid this is, for remembering its view. */
  viewOptionsKey?:   string;
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
