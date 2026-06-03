import type React from 'react';
import type { AvatarListItemProps } from '../AvatarListItem/types';
import type { FormBlockSettingsStructureProps } from '../FormBlockSettings/FormBlockSettings';
import type { FormBlockInputStructureProps } from '../FormBlockInput/FormBlockInput';
import type { FormBlockExpandableProps } from '../FormBlockExpandable/types';
import type { FormBlockStackedProps } from '../FormBlockStacked/FormBlockStacked';

/** The structural children a SettingsView accepts. */
export type FormBlockElement =
  | React.ReactElement<FormBlockSettingsStructureProps>
  | React.ReactElement<FormBlockInputStructureProps>
  | React.ReactElement<FormBlockExpandableProps>
  | React.ReactElement<FormBlockStackedProps>;

export interface SettingsViewProps {
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
  isDirty?:              boolean;
  onSave?:               () => void;
  onCancel?:             () => void;
  modeSpaceNotification?: string;
  header?: React.ReactNode;
  children: FormBlockElement | FormBlockElement[];
}
