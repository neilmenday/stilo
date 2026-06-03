import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { ListViewWithTabsProps } from '../../src/components/ListViewWithTabs';

function ListViewWithTabsDemo({
  title = 'List View',
  tabs = [{ id: 'all', label: 'All' }, { id: 'active', label: 'Active' }, { id: 'inactive', label: 'Inactive' }],
  activeTabId: activeTabIdProp,
  onTabChange,
}: ListViewWithTabsProps) {
  const [activeTab, setActiveTab] = useState(activeTabIdProp ?? tabs[0]?.id ?? 'all');

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    onTabChange?.(id);
  };

  const allItems = [
    { label: 'Alice Johnson', status: 'active' },
    { label: 'Bob Smith', status: 'inactive' },
    { label: 'Carol White', status: 'active' },
  ];

  const filtered = activeTab === 'all' ? allItems : allItems.filter(i => i.status === activeTab);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', border: '1px solid #e0e0e0', borderRadius: 8, background: '#fff', width: 480 }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, fontSize: 14, color: '#111' }}>
        {title}
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', padding: '0 16px' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            style={{
              padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? '#111' : '#555',
              borderBottom: activeTab === tab.id ? '2px solid #111' : '2px solid transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {filtered.map((item, i) => (
          <div key={i} style={{ padding: '10px 16px', borderBottom: i < filtered.length - 1 ? '1px solid #e0e0e0' : 'none', fontSize: 13, color: '#111', display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.label}</span>
            <span style={{ fontSize: 12, color: '#555' }}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof ListViewWithTabsDemo> = {
  title: 'Stilo/Components/ListViewWithTabs',
  component: ListViewWithTabsDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ListViewWithTabsDemo>;

export const Default: Story = {
  args: {
    title: 'Team members',
    tabs: [{ id: 'all', label: 'All' }, { id: 'active', label: 'Active' }, { id: 'inactive', label: 'Inactive' }],
  },
};
