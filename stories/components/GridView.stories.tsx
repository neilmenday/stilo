import type { Meta, StoryObj } from '@storybook/react';
import type { GridViewProps } from '../../src/components/GridView';

function GridViewDemo({
  title = 'Grid View',
  children,
}: GridViewProps) {
  const items = [
    { id: 1, label: 'Item Alpha', meta: '5 records' },
    { id: 2, label: 'Item Beta', meta: '12 records' },
    { id: 3, label: 'Item Gamma', meta: '3 records' },
    { id: 4, label: 'Item Delta', meta: '8 records' },
  ];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', border: '1px solid #e0e0e0', borderRadius: 8, background: '#fff', width: 560 }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, fontSize: 14, color: '#111' }}>
        {title}
      </div>
      <div style={{ padding: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {items.map(item => (
          <div key={item.id} style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: '14px 16px', background: '#fff' }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#111' }}>{item.label}</div>
            <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{item.meta}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof GridViewDemo> = {
  title: 'Stilo/Components/GridView',
  component: GridViewDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof GridViewDemo>;

export const Default: Story = { args: { title: 'Grid View' } };
