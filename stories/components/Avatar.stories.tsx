import type { Meta, StoryObj } from '@storybook/react';
import type { AvatarProps } from '../../src/components/Avatar';
import { AVATAR_SIZES } from '../../src/components/Avatar';

function AvatarDemo({ type = 'initials', initials = 'NM', src, alt }: AvatarProps) {
  const size = AVATAR_SIZES[type ?? 'initials'];
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
        fontSize: Math.round(size * 0.35),
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
