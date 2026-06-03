import type { Meta, StoryObj } from '@storybook/react';
import { useAvatarListItem } from '../../src/components/AvatarListItem';
import type { AvatarListItemProps } from '../../src/components/AvatarListItem';

function AvatarListItemDemo({
  name = 'Neil Menday',
  avatarInitials = 'NM',
  status = 'active',
  onLabel = 'Active',
  offLabel = 'Inactive',
  showStatus = true,
  showIdentifierIcon = false,
  identifierActive = false,
  onNameClick,
}: AvatarListItemProps) {
  const { iconVisible, nameHoverProps, handleNameClick } = useAvatarListItem({
    identifierActive,
    showIdentifierIcon,
    onNameClick,
  });
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      fontFamily: 'system-ui, sans-serif', padding: '8px 12px',
      border: '1px solid #e0e0e0', borderRadius: 4, width: 280,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: '#e0e0e0', display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: 13, color: '#111', flexShrink: 0,
      }}>
        {avatarInitials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          {...nameHoverProps}
          onClick={handleNameClick}
          style={{
            fontSize: 13, fontWeight: 600,
            color: iconVisible ? '#0066cc' : '#111',
            cursor: 'pointer',
          }}
        >
          {name}
          {showIdentifierIcon && iconVisible && (
            <span style={{ marginLeft: 4, fontSize: 11 }}>→</span>
          )}
        </div>
      </div>
      {showStatus && (
        <div style={{ fontSize: 12, color: status === 'active' ? '#111' : '#555' }}>
          {status === 'active' ? onLabel : offLabel}
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof AvatarListItemDemo> = {
  title: 'Stilo/Components - Passive/AvatarListItem',
  component: AvatarListItemDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AvatarListItemDemo>;

export const Default: Story = {
  args: {
    name: 'Neil Menday',
    avatarInitials: 'NM',
    status: 'active',
    onLabel: 'Active',
    offLabel: 'Inactive',
    showStatus: true,
    showIdentifierIcon: false,
    identifierActive: false,
  },
};
