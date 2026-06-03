import type React from 'react';

export interface GridItem {
  id:               string | number;
  title:            string;
  metaLabel?:       string;
  status?:          'active' | 'inactive';
  mapCenter?:       [number, number];
  mapZoom?:         number;
  dotMenuItems?:    string[];
  onDotMenuSelect?: (index: number, label: string) => void;
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
}
