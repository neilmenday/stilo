import type React from 'react';

export interface ListViewWithTabsProps {
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
  tabs:         { id: string; label: string }[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  header?: React.ReactNode;
  children: React.ReactNode;
}
