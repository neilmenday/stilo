export interface SalesforceNavItem {
  label:        string;
  hasDropdown?: boolean;
}

export interface SalesforceNavProps {
  appName?:     string;
  items:        SalesforceNavItem[];
  activeItem?:  string;
  onItemClick?: (label: string) => void;
}
