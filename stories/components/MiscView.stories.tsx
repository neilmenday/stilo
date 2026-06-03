import type { Meta, StoryObj } from '@storybook/react';
import { useMiscView } from '../../src/components/MiscView';
import type { MiscViewProps } from '../../src/components/MiscView';

function MiscViewDemo({
  title = 'View',
  tabs = [{ id: 'overview', label: 'Overview' }, { id: 'details', label: 'Details' }],
  activeTabId: activeTabIdProp,
  onTabChange,
  children,
}: MiscViewProps) {
  const { activeTabId, handleTabChange } = useMiscView({
    activeTabIdProp,
    defaultTabId: tabs?.[0]?.id,
    onTabChange,
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', border: '1px solid #e0e0e0', borderRadius: 8, background: '#fff', width: 520 }}>
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, fontSize: 14, color: '#111' }}>
        {title}
      </div>
      {tabs && tabs.length > 0 && (
        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', padding: '0 16px' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              style={{
                padding: '8px 14px', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: activeTabId === tab.id ? 600 : 400,
                color: activeTabId === tab.id ? '#111' : '#555',
                borderBottom: activeTabId === tab.id ? '2px solid #111' : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <div style={{ padding: 16, fontSize: 13, color: '#555' }}>
        {children ?? `Active tab: ${activeTabId}`}
      </div>
    </div>
  );
}

const meta: Meta<typeof MiscViewDemo> = {
  title: 'Stilo/Views/MiscView',
  component: MiscViewDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MiscViewDemo>;

export const Default: Story = {
  args: {
    title: 'Analytics View',
    tabs: [{ id: 'overview', label: 'Overview' }, { id: 'details', label: 'Details' }, { id: 'history', label: 'History' }],
  },
};
