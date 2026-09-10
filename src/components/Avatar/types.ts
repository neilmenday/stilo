export type AvatarVariant = 'initials' | 'icon' | 'image';

export interface AvatarProps {
  variant?: AvatarVariant;
  initials?: string;
  src?: string;
  alt?: string;
}
