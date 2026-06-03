import type { Meta, StoryObj } from '@storybook/react';
import { useSettingsView } from '../../src/components/SettingsView';
import type { SettingsViewProps } from '../../src/components/SettingsView';

function SettingsViewDemo({
  title = 'Settings',
  navItems = ['General', 'Notifications', 'Security', 'Integrations'],
  activeNavItem = 'General',
  isDirty = false,
  onNavChange,
  onSave,
  onCancel,
}: SettingsViewProps) {
  const { navWarning, handleNavClick, handleSave, handleCancel } = useSettingsView({
    isDirty, onNavChange, onSave, onCancel,
  });

  return (
    <div style={{ display: 'flex', height: 320, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: 180, borderRight: '1px solid #e0e0e0', background: '#f5f5f5', padding: '12px 8px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#555', padding: '0 8px 8px' }}>SETTINGS</div>
        {(navItems ?? []).map(item => (
          <div
            key={item}
            onClick={() => handleNavClick(item)}
            style={{
              padding: '7px 10px', borderRadius: 4, fontSize: 13, cursor: 'pointer',
              background: item === activeNavItem ? '#e0e0e0' : 'transparent',
              color: item === activeNavItem ? '#111' : '#555',
            }}
          >
            {item}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, fontSize: 14, color: '#111' }}>
          {title}
        </div>
        <div style={{ flex: 1, padding: 16, fontSize: 13, color: '#555' }}>Settings content area</div>
        {isDirty && (
          <div style={{ padding: '10px 16px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={handleCancel} style={{ padding: '6px 12px', background: 'transparent', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 12, cursor: 'pointer', color: '#111' }}>Cancel</button>
            <button onClick={handleSave} style={{ padding: '6px 12px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, fontSize: 12, cursor: 'pointer' }}>Save</button>
          </div>
        )}
        {navWarning && (
          <div style={{ padding: '10px 16px', borderTop: '1px solid #e0e0e0', background: '#fff1f0', fontSize: 12, color: '#820014' }}>
            You have unsaved changes. Save or discard before navigating.
          </div>
        )}
      </div>
    </div>
  );
}

const meta: Meta<typeof SettingsViewDemo> = {
  title: 'Stilo/Views/SettingsView',
  component: SettingsViewDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SettingsViewDemo>;

export const Default: Story = {
  args: { title: 'Settings', navItems: ['General', 'Notifications', 'Security'], activeNavItem: 'General', isDirty: false },
};
export const WithUnsavedChanges: Story = {
  args: { title: 'Settings', navItems: ['General', 'Notifications', 'Security'], activeNavItem: 'General', isDirty: true },
};
