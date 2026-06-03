import type React from 'react';

export interface ListItem {
  id: string | number;
  identifierLabel?: string;
  avatarSrc?: string;
  avatarInitials?: string;
  status?: 'active' | 'inactive';
  showMeta?: boolean;
  metaLabel?: string;
  avatarCount?: number;
  avatarSrcs?: string[];
  avatarOverflow?: string;
  tags?: string[];
  responseState?: boolean;
  toggleChecked?: boolean;
  showOptionTextField?: boolean;
  optionTextFieldValue?: string;
  actionLabel?: string;
  dotMenuItems?: string[];
  onActionClick?: () => void;
  onDotMenuSelect?: (index: number, label: string) => void;
  [key: string]: unknown;
}

export interface ControllableListSetProps {
  items: ListItem[];
  variant?:             string;
  panelTitle?:          (item: ListItem) => string;
  renderPanelContent?:  (item: ListItem, onClose: () => void) => React.ReactNode;
  renderPanelActions?:  (item: ListItem, onClose: () => void) => React.ReactNode;
  onNavigate?:          (item: ListItem) => void;
  drawerWidth?:         number;
  overlayWidth?:        number;
  tabs?:        { id: string; label: string }[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  identifierTitle?:     string;
  supportingInfoTitle?: string;
  statusTitle?:         string;
  actionTitle?:         string;
  onLabel?:    string;
  offLabel?:   string;
  identifierCell?:     'AvatarListItem' | 'ListItem';
  showIdentifierIcon?: boolean;
  identifierIconName?: string;
  showCheckbox?:   boolean;
  showDragHandle?: boolean;
  filterPanelWidth?:     number;
  renderFilterResponse?: (values: Record<string, string>) => React.ReactNode;
  searchLabel?: string;
  bulkLabel?: string;
  bulkItems?: { value: string; label: string }[];
  bulkDisabled?: boolean;
  onBulkSelect?: (item: { value: string; label: string }) => void;
  buttonLabel?:    string;
  buttonDisabled?: boolean;
  onButtonClick?:  () => void;
  onSelectionChange?: (selectedIds: Set<string | number>) => void;
  showHistory?:    boolean;
  historyLabel?:   string;
  onHistoryClick?: () => void;
  onAnyToggleChange?: (id: string | number, checked: boolean) => void;
  onReorder?: (items: ListItem[]) => void;
  reorderNotification?: string;
  content?:        string;
  contentVariant?: string;
}
