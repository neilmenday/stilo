import type React from 'react';

export interface GridViewContextValue {
  content?: string;
  contentVariant?: string;
}

export interface GridViewProps {
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
  actionLabel?:             string;
  onActionClick?:           () => void;
  showHeaderChooser?:       boolean;
  headerChooserLabel?:      string;
  headerChooserDisplayValue?:  string;
  headerChooserItems?:      { value: string; label: string }[];
  onHeaderChooserSelect?:   (item: { value: string; label: string }) => void;
  header?: React.ReactNode;
  variant?: 'default' | 'card';
  content?: string;
  contentVariant?: string;
  children: React.ReactNode;
}
