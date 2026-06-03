import type { Meta, StoryObj } from '@storybook/react';
import { useInfoListItem } from '../../src/components/InfoListItem';
import type { InfoListItemProps } from '../../src/components/InfoListItem';

function InfoListItemDemo({
  variant = 'Row',
  identifierLabel = 'Alice Johnson',
  avatarInitials = 'AJ',
  status = 'active',
  onLabel = 'Active',
  offLabel = 'Inactive',
  metaLabel = 'Sales Manager',
  showMeta = true,
  identifierActive = false,
  onIdentifierClick,
}: InfoListItemProps) {
  const { isSelected, handleIdentifierClick } = useInfoListItem({
    identifierActive,
    onIdentifierClick,
  });

  if (variant === 'Blank') {
    return (
      <div style={{ padding: '12px 16px', fontSize: 13, color: '#555', fontFamily: 'system-ui, sans-serif', border: '1px solid #e0e0e0', borderRadius: 4 }}>
        No items to display
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '10px 14px', border: '1px solid #e0e0e0',
      borderRadius: 4, background: isSelected ? '#f5f5f5' : '#fff',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#111', flexShrink: 0 }}>
        {avatarInitials}
      </div>
      <div style={{ flex: 1 }}>
        <div
          onClick={handleIdentifierClick}
          style={{ fontSize: 13, fontWeight: 600, color: isSelected ? '#0066cc' : '#111', cursor: onIdentifierClick ? 'pointer' : 'default' }}
        >
          {identifierLabel}
        </div>
        {showMeta && metaLabel && <div style={{ fontSize: 12, color: '#555' }}>{metaLabel}</div>}
      </div>
      <div style={{ fontSize: 12, color: status === 'active' ? '#111' : '#555' }}>
        {status === 'active' ? onLabel : offLabel}
      </div>
    </div>
  );
}

const meta: Meta<typeof InfoListItemDemo> = {
  title: 'Stilo/Components/InfoListItem',
  component: InfoListItemDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof InfoListItemDemo>;

export const Default: Story = {
  args: {
    variant: 'Row',
    identifierLabel: 'Alice Johnson',
    avatarInitials: 'AJ',
    status: 'active',
    onLabel: 'Active',
    offLabel: 'Inactive',
    metaLabel: 'Sales Manager',
    showMeta: true,
  },
};
