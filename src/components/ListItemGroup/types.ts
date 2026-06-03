import type React from 'react';

export type ListItemGroupVariant = 'draggable' | 'static' | 'expandable';

export interface ListItemGroupItem {
  id:       string;
  label:    string;
  colour?:  string;
  content?: React.ReactNode;
}

export interface ListItemGroupProps {
  items:           ListItemGroupItem[];
  variant?:        ListItemGroupVariant;
  selectedId?:     string;
  onSelect?:       (id: string) => void;
  onItemRef?:      (id: string, el: HTMLDivElement | null) => void;
  onReorder?:      (items: ListItemGroupItem[]) => void;
  onColourChange?: (id: string, hex: string) => void;
}
