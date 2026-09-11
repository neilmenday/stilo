import type { Meta, StoryObj } from '@storybook/react';
import type { AvatarProps, AvatarVariant } from '../../src/components/Avatar';
import { Icon } from '../../src/components/Icon';
import { colors } from '../../src/tokens';

// All three real variants share one size - nothing in Stilo varies Avatar's
// size by content type, so a single literal here (not a per-variant table)
// is the honest shape.
const SIZE = 36;
const FONT_SIZE = 13;

// Background is real per-variant, not shared - a real design system can
// legitimately want Icon's background to differ from Initials'/Image's
// (e.g. a designer styling one variant in Figma via Sync from Figma).
// Starts identical across all three; each key is independently real.
const BACKGROUND_BY_TYPE: Record<AvatarVariant, string> = {
  initials: colors.primeBlue100,
  icon: '#e0e0e0',
  image: '#e0e0e0',
};

// Pravatar (i.pravatar.cc): free, no API key, genuinely random real photo
// per request (no-store cache-control - each fetch is a different face).
// Fine for demo purposes; this is the only real content this story needs.
const PLACEHOLDER_PHOTO = 'https://i.pravatar.cc/150';

// Exported (not just used locally in this file) so a real composing
// component - AvatarListItem - can genuinely nest the real Avatar
// rendering, rather than hand-rolling its own approximation. Stilo has no
// separate importable production Avatar component (structural skeleton
// only, see src/components/Avatar/types.ts) - this demo function IS the
// one real place Avatar's real rendering exists.
export function AvatarDemo({ variant = 'initials', initials = 'NM', src, alt }: AvatarProps) {
  return (
    <div
      style={{
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        background: BACKGROUND_BY_TYPE[variant ?? 'initials'],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: FONT_SIZE,
        fontFamily: 'system-ui, sans-serif',
        color: '#111',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {variant === 'image'
        ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        : variant === 'icon'
        ? <Icon name="user" size={20} />
        : initials}
    </div>
  );
}

const meta: Meta<typeof AvatarDemo> = {
  title: 'Stilo/Components - Passive/Avatar',
  component: AvatarDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AvatarDemo>;

export const Initials: Story = { args: { variant: 'initials', initials: 'NM' } };
// "Icon" as an export identifier would collide with the imported Icon
// component above - same pattern Icon.stories.tsx itself already uses for
// a display name that isn't a valid/available identifier.
export const IconVariant: Story = { name: 'Icon', args: { variant: 'icon' } };
export const Image: Story = { args: { variant: 'image', src: PLACEHOLDER_PHOTO, alt: 'User avatar' } };
