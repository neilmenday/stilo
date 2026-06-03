import type { Meta, StoryObj } from '@storybook/react';
import type { SalesforceNavProps } from '../../src/components/SalesforceNav';

function SalesforceNavDemo({
  appName = 'My App',
  items = [{ label: 'Home' }, { label: 'Accounts' }, { label: 'Contacts' }, { label: 'Reports' }],
  activeItem = 'Accounts',
  onItemClick,
}: SalesforceNavProps) {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', gap: 0,
      background: '#111', padding: '0 16px',
      fontFamily: 'system-ui, sans-serif', height: 44,
    }}>
      {appName && (
        <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginRight: 16 }}>{appName}</div>
      )}
      {items.map(item => (
        <button
          key={item.label}
          onClick={() => onItemClick?.(item.label)}
          style={{
            padding: '0 12px', height: 44, background: 'none', border: 'none',
            fontSize: 13, color: item.label === activeItem ? '#fff' : 'rgba(255,255,255,0.6)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4,
            borderBottom: item.label === activeItem ? '2px solid #fff' : '2px solid transparent',
          }}
        >
          {item.label}
          {item.hasDropdown && <span style={{ fontSize: 9 }}>▼</span>}
        </button>
      ))}
    </nav>
  );
}

const meta: Meta<typeof SalesforceNavDemo> = {
  title: 'Stilo/Foundations/SalesforceNav',
  component: SalesforceNavDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof SalesforceNavDemo>;

export const Default: Story = {
  args: {
    appName: 'My App',
    items: [{ label: 'Home' }, { label: 'Accounts', hasDropdown: true }, { label: 'Contacts' }, { label: 'Reports' }],
    activeItem: 'Accounts',
  },
};
