import type { Meta, StoryObj } from '@storybook/react';
import type { ListViewProps } from '../../src/components/ListView';

function ListViewDemo({
  title = 'List View',
  children,
}: ListViewProps) {
  const items = ['Alice Johnson', 'Bob Smith', 'Carol White', 'David Lee'];

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', border: '1px solid #e0e0e0', borderRadius: 8, background: '#fff', width: 480 }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, fontSize: 14, color: '#111' }}>
        {title}
      </div>
      <div>
        {items.map((item, i) => (
          <div key={i} style={{ padding: '10px 16px', borderBottom: i < items.length - 1 ? '1px solid #e0e0e0' : 'none', fontSize: 13, color: '#111' }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof ListViewDemo> = {
  title: 'Stilo/Views/ListView',
  component: ListViewDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ListViewDemo>;

export const Default: Story = { args: { title: 'Team members' } };
