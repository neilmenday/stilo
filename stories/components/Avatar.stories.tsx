import type { Meta, StoryObj } from '@storybook/react';
import type { AvatarProps } from '../../src/components/Avatar';
import { Icon } from '../../src/components/Icon';

// All three real variants share one size - nothing in Stilo varies Avatar's
// size by content type, so a single literal here (not a per-variant table)
// is the honest shape.
const SIZE = 36;
const FONT_SIZE = 13;

// Pravatar (i.pravatar.cc): free, no API key, genuinely random real photo
// per request (no-store cache-control - each fetch is a different face).
// Fine for demo purposes; this is the only real content this story needs.
const PLACEHOLDER_PHOTO = 'https://i.pravatar.cc/150';

function AvatarDemo({ variant = 'initials', initials = 'NM', src, alt }: AvatarProps) {
  return (
    <div
      style={{
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        background: '#e0e0e0',
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
