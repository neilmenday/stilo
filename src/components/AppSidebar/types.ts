export interface NavItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export interface AppSidebarProps {
  breadcrumbItems?: { label: string; onClick?: () => void }[];
  chooserLabel?: string;
  teams?: string[];
  selectedTeam?: string;
  navItems?: string[];
  activeItem?: string;
  onNavChange?: (item: string) => void;
  avatarListItem?: Record<string, unknown>;
}
