import type { Meta, StoryObj } from '@storybook/react';
import type { AvatarProps, AvatarType } from '../../src/components/Avatar';

// Real resolved values, not derived via AVATAR_SIZES + Math.round(size *
// 0.35) - this demo is the only consumer of that table (Stilo has no real
// rendered Avatar component, just types.ts), so there's nothing kept in
// sync by computing it here instead of just writing the real numbers, same
// as every other style value in this demo already does.
const SIZE_BY_TYPE: Record<AvatarType, number> = { identifier: 36, initials: 36, image: 36, inline: 24 };
const FONT_SIZE_BY_TYPE: Record<AvatarType, number> = { identifier: 13, initials: 13, image: 13, inline: 8 };

function AvatarDemo({ type = 'initials', initials = 'NM', src, alt }: AvatarProps) {
  const size = SIZE_BY_TYPE[type ?? 'initials'];
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: '#e0e0e0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: FONT_SIZE_BY_TYPE[type ?? 'initials'],
        fontFamily: 'system-ui, sans-serif',
        color: '#111',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {src
        ? <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

export const Default: Story = { args: { type: 'initials', initials: 'NM' } };
export const Inline: Story = { args: { type: 'inline', initials: 'NM' } };
export const Identifier: Story = { args: { type: 'identifier', initials: 'AB' } };
