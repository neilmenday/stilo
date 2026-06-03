import type { Meta, StoryObj } from '@storybook/react';
import { useNavItem } from '../../src/components/AppSidebar';
import type { AppSidebarProps } from '../../src/components/AppSidebar';

function NavItemDemo({ label = 'Nav item', isActive = false }: { label?: string; isActive?: boolean }) {
  const { hovered, hoverProps } = useNavItem();
  return (
    <div
      {...hoverProps}
      style={{
        padding: '8px 12px',
        borderRadius: 4,
        fontSize: 13,
        fontFamily: 'system-ui, sans-serif',
        color: isActive ? '#fff' : hovered ? '#111' : '#555',
        background: isActive ? '#111' : hovered ? '#f5f5f5' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
    >
      {label}
    </div>
  );
}

function AppSidebarDemo({
  navItems = ['Dashboard', 'Records', 'Reports', 'Settings'],
  activeItem = 'Records',
  chooserLabel = 'Workspace',
  teams = ['Team Alpha', 'Team Beta'],
  selectedTeam = 'Team Alpha',
}: AppSidebarProps) {
  return (
    <div style={{
      width: 220,
      background: '#f5f5f5',
      borderRight: '1px solid #e0e0e0',
      padding: '16px 8px',
      fontFamily: 'system-ui, sans-serif',
      minHeight: 400,
    }}>
      {chooserLabel && (
        <div style={{ fontSize: 12, color: '#555', padding: '4px 12px 12px', fontWeight: 600 }}>
          {chooserLabel}: {selectedTeam ?? teams?.[0]}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {(navItems ?? []).map(item => (
          <NavItemDemo key={item} label={item} isActive={item === activeItem} />
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof AppSidebarDemo> = {
  title: 'Stilo/Components/AppSidebar',
  component: AppSidebarDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AppSidebarDemo>;

export const Default: Story = {
  args: {
    navItems: ['Dashboard', 'Records', 'Reports', 'Settings'],
    activeItem: 'Records',
    chooserLabel: 'Workspace',
    teams: ['Team Alpha', 'Team Beta'],
    selectedTeam: 'Team Alpha',
  },
};
