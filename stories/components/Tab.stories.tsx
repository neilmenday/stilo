import type { Meta, StoryObj } from '@storybook/react';
import type { TabBarProps } from '../../src/components/Tab';

function TabBarDemo({ tabs, activeId, onChange }: TabBarProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              padding: '9px 16px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: tab.id === activeId ? 600 : 400,
              color: tab.id === activeId ? '#111' : '#555',
              borderBottom: tab.id === activeId ? '2px solid #111' : '2px solid transparent',
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof TabBarDemo> = {
  title: 'Stilo/Components/Tab',
  component: TabBarDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TabBarDemo>;

export const Default: Story = {
  args: {
    tabs: [{ id: 'all', label: 'All' }, { id: 'active', label: 'Active' }, { id: 'archived', label: 'Archived' }],
    activeId: 'all',
    onChange: () => {},
  },
};
