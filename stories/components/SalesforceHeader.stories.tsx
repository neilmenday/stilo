import type { Meta, StoryObj } from '@storybook/react';
import type { SalesforceHeaderProps } from '../../src/components/SalesforceHeader';

function SalesforceHeaderDemo({
  appName = 'My App',
  navItems = [{ label: 'Home' }, { label: 'Records' }, { label: 'Reports' }],
  activeNavItem = 'Records',
  searchPlaceholder = 'Search…',
}: SalesforceHeaderProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '0 16px', height: 48, background: '#111',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{appName}</div>
      <div style={{ display: 'flex', gap: 2 }}>
        {navItems.map(item => (
          <div
            key={item.label}
            style={{
              padding: '0 12px', height: 48, display: 'flex', alignItems: 'center',
              fontSize: 13, color: item.label === activeNavItem ? '#fff' : 'rgba(255,255,255,0.6)',
              cursor: 'pointer',
              borderBottom: item.label === activeNavItem ? '2px solid #fff' : '2px solid transparent',
            }}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <input
          placeholder={searchPlaceholder}
          style={{
            fontSize: 13, padding: '5px 12px', borderRadius: 20,
            border: 'none', background: 'rgba(255,255,255,0.15)',
            color: '#fff', width: 180, outline: 'none',
          }}
        />
      </div>
      <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#111' }}>
        NM
      </div>
    </div>
  );
}

const meta: Meta<typeof SalesforceHeaderDemo> = {
  title: 'Stilo/Components/SalesforceHeader',
  component: SalesforceHeaderDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SalesforceHeaderDemo>;

export const Default: Story = {
  args: {
    appName: 'My App',
    navItems: [{ label: 'Home' }, { label: 'Records', hasDropdown: true }, { label: 'Reports' }],
    activeNavItem: 'Records',
    searchPlaceholder: 'Search…',
  },
};
