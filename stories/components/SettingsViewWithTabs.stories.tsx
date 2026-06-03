import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useSettingsViewWithTabs } from '../../src/components/SettingsViewWithTabs';
import type { SettingsViewWithTabsProps } from '../../src/components/SettingsViewWithTabs';

function SettingsViewWithTabsDemo({
  title = 'Settings',
  navItems = ['General', 'Notifications', 'Security'],
  activeNavItem = 'General',
  tabs = [{ id: 'basic', label: 'Basic' }, { id: 'advanced', label: 'Advanced' }],
  activeTabId: activeTabIdProp,
  onTabChange,
  isDirty = false,
}: SettingsViewWithTabsProps) {
  const [activeTab, setActiveTab] = useState(activeTabIdProp ?? tabs[0]?.id ?? 'basic');
  const { navWarning, handleNavClick, handleSave, handleCancel } = useSettingsViewWithTabs({ isDirty });

  const handleTabChange = (id: string) => { setActiveTab(id); onTabChange?.(id); };

  return (
    <div style={{ display: 'flex', height: 340, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: 180, borderRight: '1px solid #e0e0e0', background: '#f5f5f5', padding: '12px 8px' }}>
        {(navItems ?? []).map(item => (
          <div key={item} onClick={() => handleNavClick(item)} style={{ padding: '7px 10px', borderRadius: 4, fontSize: 13, cursor: 'pointer', background: item === activeNavItem ? '#e0e0e0' : 'transparent', color: item === activeNavItem ? '#111' : '#555' }}>
            {item}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, fontSize: 14, color: '#111' }}>{title}</div>
        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', padding: '0 16px' }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => handleTabChange(tab.id)} style={{ padding: '8px 12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? '#111' : '#555', borderBottom: activeTab === tab.id ? '2px solid #111' : '2px solid transparent' }}>
              {tab.label}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, padding: 16, fontSize: 13, color: '#555' }}>Active tab: {activeTab}</div>
        {isDirty && (
          <div style={{ padding: '10px 16px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={handleCancel} style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 12, cursor: 'pointer', color: '#111' }}>Cancel</button>
            <button onClick={handleSave} style={{ padding: '6px 12px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof SettingsViewWithTabsDemo> = {
  title: 'Stilo/Views/SettingsViewWithTabs',
  component: SettingsViewWithTabsDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SettingsViewWithTabsDemo>;

export const Default: Story = {
  args: { title: 'Settings', navItems: ['General', 'Notifications'], tabs: [{ id: 'basic', label: 'Basic' }, { id: 'advanced', label: 'Advanced' }], isDirty: false },
};
