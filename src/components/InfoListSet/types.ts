import type React from 'react';
import type { InfoListActionVariant, InfoListActionButton } from '../InfoListItem/types';

export type InfoListSetPanelConfig = 'drawer' | 'overlay' | 'navigation';

export interface InfoListRow {
  id: string | number;
  identifierLabel?:     string;
  avatarSrc?:           string;
  avatarInitials?:      string;
  status?:              'active' | 'inactive';
  showMeta?:            boolean;
  metaLabel?:           string;
  supportingText?:      string;
  avatarCount?:         number;
  avatarSrcs?:          string[];
  avatarOverflow?:      string;
  tags?:                string[];
  statusText?:          string;
  toggleChecked?:       boolean;
  onToggleChange?:      (checked: boolean) => void;
  showOptionTextField?: boolean;
  optionTextFieldValue?: string;
  actionLabel?:         string;
  dotMenuItems?:        string[];
  onDotMenuSelect?:     (index: number, label: string) => void;
  actionButtons?:       InfoListActionButton[];
  responseState?:       boolean;
  rowChecked?:          boolean;
  onRowCheck?:          (checked: boolean) => void;
  onIdentifierClick?:   () => void;
  [key: string]: unknown;
}

export interface InfoListSetProps {
  panelConfig?:    InfoListSetPanelConfig;
  actionVariant?:  InfoListActionVariant;
  rows:      InfoListRow[];
  identifierTitle?:     string;
  supportingInfoTitle?: string;
  statusTitle?:         string;
  actionTitle?:         string;
  onLabel?:    string;
  offLabel?:   string;
  identifierCell?:     'AvatarListItem' | 'ListItem';
  showIdentifierIcon?: boolean;
  identifierIconName?: string;
  activeRowId?:        string | number;
  showCheckbox?:   boolean;
  showDragHandle?: boolean;
  selectAllChecked?: boolean;
  onSelectAll?:      (checked: boolean) => void;
  panelTitle?:          (row: InfoListRow) => string;
  renderPanelContent?:  (row: InfoListRow, onClose: () => void) => React.ReactNode;
  onPanelSave?:         (row: InfoListRow) => void;
  drawerWidth?:         number;
  overlayWidth?:        number;
  onNavigate?: (row: InfoListRow) => void;
  onReorder?: (rows: InfoListRow[]) => void;
}
