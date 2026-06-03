import type { Meta, StoryObj } from '@storybook/react';
import type { HShapeLayoutProps } from '../../src/components/HShapeLayout';

function HShapeLayoutDemo({
  col1Width = 240,
  col3Width = 240,
}: HShapeLayoutProps) {
  return (
    <div style={{ display: 'flex', height: 280, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: col1Width, borderRight: '1px solid #e0e0e0', background: '#f5f5f5', padding: 12, flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#555', marginBottom: 8 }}>SIDEBAR</div>
        {['Item 1', 'Item 2', 'Item 3'].map(i => (
          <div key={i} style={{ padding: '6px 8px', fontSize: 13, color: '#111', cursor: 'pointer' }}>{i}</div>
        ))}
      </div>
      <div style={{ flex: 1, background: '#fff', padding: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#555', marginBottom: 8 }}>MAIN COLUMN</div>
        <div style={{ fontSize: 13, color: '#555' }}>Main content area. This is the primary column in the H-shape layout.</div>
      </div>
      <div style={{ width: col3Width, borderLeft: '1px solid #e0e0e0', background: '#f5f5f5', padding: 12, flexShrink: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: '#555', marginBottom: 8 }}>DETAIL PANEL</div>
        <div style={{ fontSize: 13, color: '#555' }}>Detail content</div>
      </div>
    </div>
  );
}

const meta: Meta<typeof HShapeLayoutDemo> = {
  title: 'Stilo/Foundations/HShapeLayout',
  component: HShapeLayoutDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof HShapeLayoutDemo>;

export const Default: Story = { args: { col1Width: 200, col3Width: 240 } };
