import type { Meta, StoryObj } from '@storybook/react';
import { spacing } from '../../src/tokens';

function SpacingScale() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'system-ui, sans-serif' }}>
      {Object.entries(spacing).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 160, fontSize: 13, color: '#111', fontWeight: 600 }}>{key}</div>
          <div style={{ width: value, height: 24, background: '#111', borderRadius: 2 }} />
          <div style={{ fontSize: 12, color: '#555' }}>{value}px</div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Stilo/Tokens/Spacing',
  component: SpacingScale,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
