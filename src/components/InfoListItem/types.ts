import type React from 'react';

export type InfoListItemVariant    = 'Title' | 'Row' | 'Blank';
export type InfoListActionVariant  = 'Menu' | 'Buttons';

export interface InfoListActionButton {
  label:          string;
  icon?:          React.ReactNode;
  buttonVariant?: 'text' | 'icon-only';
  onClick?:       () => void;
}

export interface InfoListItemProps {
  variant?: InfoListItemVariant;
  responseState?: boolean;
  showCheckbox?: boolean;
  selectAllChecked?: boolean;
  onSelectAll?:      (checked: boolean) => void;
  rowChecked?: boolean;
  onRowCheck?: (checked: boolean) => void;
  identifierTitle?:     string;
  supportingInfoTitle?: string;
  statusTitle?:         string;
  actionTitle?:         string;
  identifierCell?:    'AvatarListItem' | 'ListItem';
  identifierLabel?:   string;
  avatarSrc?:         string;
  avatarInitials?:    string;
  onIdentifierClick?: () => void;
  status?:            'active' | 'inactive';
  onLabel?:           string;
  offLabel?:          string;
  showMeta?:          boolean;
  metaLabel?:         string;
  showIdentifierIcon?: boolean;
  identifierIconName?: string;
  identifierActive?:   boolean;
  supportingText?: string;
  avatarCount?:    number;
  avatarSrcs?:     string[];
  avatarOverflow?: string;
  tags?:           string[];
  showDragHandle?: boolean;
  isDragging?: boolean;
  statusText?:              string;
  toggleChecked?:           boolean;
  onToggleChange?:          (checked: boolean) => void;
  showOptionTextField?:     boolean;
  optionTextFieldValue?:    string;
  onOptionTextFieldChange?: (v: string) => void;
  showStatusColumn?: boolean;
  showStatusIndicator?: boolean;
  showActionColumn?: boolean;
  actionVariant?:   InfoListActionVariant;
  actionButtons?:   InfoListActionButton[];
  actionLabel?:    string;
  onActionClick?:  () => void;
  dotMenuItems?:   string[];
  onDotMenuSelect?: (index: number, label: string) => void;
  blankPlaceholder?: string;
  configureLabel?:   string;
  onConfigure?:      () => void;
}
