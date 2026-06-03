import type { Meta, StoryObj } from '@storybook/react';
import type { IconProps } from '../../src/components/Icon';

function IconDemo({ name = 'star', size = 24, color = '#111', label }: IconProps) {
  // Represents an icon placeholder — stilo only models the props structure, not actual icon rendering
  return (
    <div
      role="img"
      aria-label={label ?? name}
      style={{
        width: size, height: size, borderRadius: 4,
        background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: Math.round(size * 0.5), color, fontFamily: 'system-ui, sans-serif',
        userSelect: 'none',
      }}
    >
      ✦
    </div>
  );
}

function IconGallery() {
  const names = ['star', 'edit', 'delete', 'add', 'close', 'check', 'search', 'filter'];
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontFamily: 'system-ui, sans-serif' }}>
      {names.map(name => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <IconDemo name={name} size={24} color="#111" />
          <span style={{ fontSize: 11, color: '#555' }}>{name}</span>
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof IconDemo> = {
  title: 'Stilo/Icons/Icon',
  component: IconDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof IconDemo>;

export const Default: Story = { args: { name: 'star', size: 24, color: '#111' } };
export const Large: Story = { args: { name: 'edit', size: 36, color: '#0066cc' } };
