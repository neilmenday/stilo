import type { Meta, StoryObj } from '@storybook/react';
import { radius } from '../../src/tokens';

function RadiusScale() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontFamily: 'system-ui, sans-serif' }}>
      {Object.entries(radius).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 160, fontSize: 13, color: '#111', fontWeight: 600 }}>{key}</div>
          <div style={{
            width: 80,
            height: 48,
            background: '#e0e0e0',
            border: '1px solid #ccc',
            borderRadius: value,
          }} />
          <div style={{ fontSize: 12, color: '#555' }}>{value}px</div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta = {
  title: 'Stilo/Foundations/Tokens/Radius',
  component: RadiusScale,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj;
export const Default: Story = {};
