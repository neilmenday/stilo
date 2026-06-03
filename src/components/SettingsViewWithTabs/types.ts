import type React from 'react';
import type { AvatarListItemProps } from '../AvatarListItem/types';

export interface SettingsViewWithTabsProps {
  teams?:           string[];
  selectedTeam?:    string;
  navItems?:        string[];
  activeNavItem?:   string;
  onNavChange?:     (item: string) => void;
  breadcrumbItems?: { label: string; onClick?: () => void }[];
  chooserLabel?:    string;
  avatarListItem?:  AvatarListItemProps;
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
  isDirty?:               boolean;
  onSave?:                () => void;
  onCancel?:              () => void;
  modeSpaceNotification?: string;
  children: React.ReactNode;
}
