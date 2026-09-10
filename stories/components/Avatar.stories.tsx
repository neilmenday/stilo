import type { Meta, StoryObj } from '@storybook/react';
import type { AvatarProps } from '../../src/components/Avatar';
import { Icon } from '../../src/components/Icon';

// All three real variants share one size - nothing in Stilo varies Avatar's
// size by content type, so a single literal here (not a per-variant table)
// is the honest shape.
const SIZE = 36;
const FONT_SIZE = 13;

// Small self-contained placeholder photo (a real 8x8 solid-colour PNG, base64
// data URI - not an external request) so the Image variant always renders
// the same way in Storybook and in Chromatic snapshots, with no asset-
// serving setup needed. A plain literal, not built with encodeURIComponent -
// this is the story's own test data, not real Stilo behaviour worth
// preserving as a runtime computation.
const PLACEHOLDER_PHOTO =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAEUlEQVR4nGM4sW0ZVsQwtCQAkGOJAcqb8H0AAAAASUVORK5CYII=';

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
