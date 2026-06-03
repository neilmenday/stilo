export type AvatarType = 'identifier' | 'inline' | 'initials' | 'image';

export interface AvatarProps {
  type?: AvatarType;
  initials?: string;
  src?: string;
  alt?: string;
}

export const AVATAR_SIZES: Record<AvatarType, number> = {
  identifier: 36,
  initials:   36,
  image:      36,
  inline:     24,
};
