import type { SalesforceNavItem } from '../SalesforceNav/types';

export interface SalesforceHeaderProps {
  searchPlaceholder?: string;
  onSearch?:          (value: string) => void;
  avatarColor?:       string;
  appName?:      string;
  navItems:      SalesforceNavItem[];
  activeNavItem?: string;
  onNavItemClick?: (label: string) => void;
}
