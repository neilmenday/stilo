export type AvatarStatus = 'active' | 'inactive';
export type AvatarNameType = 'text' | 'button';

export interface AvatarListItemProps {
  name: string;
  nameType?: AvatarNameType;
  onNameClick?: () => void;
  avatarInitials?: string;
  avatarSrc?: string;
  avatarAlt?: string;
  showStatus?: boolean;
  showUsername?: boolean;
  status?: AvatarStatus;
  onLabel?: string;
  offLabel?: string;
  metaLabel?: string;
  showMeta?: boolean;
  showIdentifierIcon?: boolean;
  identifierIconName?: string;
  identifierActive?: boolean;
}
