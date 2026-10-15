import type { GridViewProps } from '../GridView/types';

// GridView with a TabBar under the header block - the tab variant, as
// ListViewWithTabs is for ListView. Tabs are required.
export interface GridViewWithTabsProps extends GridViewProps {
  tabs:         { id: string; label: string }[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
}
