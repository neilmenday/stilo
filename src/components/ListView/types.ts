import type React from 'react';

export interface ListViewContextValue {
  identifierCell?: 'AvatarListItem' | 'ListItem';
  showDragHandle: boolean;
  onReorder?: (items: unknown[]) => void;
  content?: string;
  contentVariant?: string;
  onLabel?: string;
  offLabel?: string;
}

export interface ListViewProps {
  teams?:           string[];
  selectedTeam?:    string;
  navItems?:        string[];
  activeNavItem?:   string;
  onNavChange?:     (item: string) => void;
  breadcrumbItems?: { label: string; onClick?: () => void }[];
  chooserLabel?:    string;
  avatarListItem?:  Record<string, unknown>;
  title:                    string;
  onHelpClick?:             () => void;
  showHeaderChooser?:       boolean;
  headerChooserLabel?:      string;
  headerChooserDisplayValue?:  string;
  headerChooserItems?:      { value: string; label: string }[];
  onHeaderChooserSelect?:   (item: { value: string; label: string }) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showDragHandle?: boolean;
  onReorder?: (items: unknown[]) => void;
  content?: string;
  contentVariant?: string;
  identifierCell?: 'AvatarListItem' | 'ListItem';
  onLabel?: string;
  offLabel?: string;
  children: React.ReactNode;
}
