import type React from 'react';

export interface MiscViewProps {
  title: string;
  onHelpClick?: () => void;
  showHeaderChooser?:      boolean;
  headerChooserLabel?:     string;
  headerChooserDisplayValue?:  string;
  headerChooserItems?:     { value: string; label: string }[];
  onHeaderChooserSelect?:  (item: { value: string; label: string }) => void;
  sidebar?: React.ReactNode;
  header?: React.ReactNode;
  tabs?: { id: string; label: string }[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  children: React.ReactNode;
}
