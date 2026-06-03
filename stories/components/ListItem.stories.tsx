import type { Meta, StoryObj } from '@storybook/react';
import { useListItem } from '../../src/components/ListItem';
import type { ListItemProps } from '../../src/components/ListItem';

function ListItemDemo({
  variant = 'default',
  label = 'List item label',
  name = 'Alice Johnson',
  nameType = 'button',
  status = 'active',
  onLabel = 'Active',
  offLabel = 'Inactive',
  showStatus = true,
  showIdentifierIcon = false,
  identifierActive = false,
  onNameClick,
}: ListItemProps) {
  const { iconVisible, handleNameClick, nameHoverProps } = useListItem({ identifierActive, showIdentifierIcon, onNameClick });

  if (variant === 'default') {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px',
        border: '1px solid #e0e0e0', borderRadius: 4, fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#e0e0e0', flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: '#111' }}>{label}</span>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
      border: '1px solid #e0e0e0', borderRadius: 4, fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#111', flexShrink: 0 }}>
        {name?.charAt(0)}
      </div>
      <div style={{ flex: 1 }}>
        <div
          {...nameHoverProps}
          onClick={handleNameClick}
          style={{ fontSize: 13, fontWeight: 600, color: iconVisible ? '#0066cc' : '#111', cursor: nameType === 'button' ? 'pointer' : 'default' }}
        >
          {name}
          {showIdentifierIcon && iconVisible && <span style={{ marginLeft: 4, fontSize: 11 }}>→</span>}
        </div>
      </div>
      {showStatus && (
        <span style={{ fontSize: 12, color: status === 'active' ? '#111' : '#555' }}>
          {status === 'active' ? onLabel : offLabel}
        </span>
      )}
    </div>
  );
}

const meta: Meta<typeof ListItemDemo> = {
  title: 'Stilo/Components/ListItem',
  component: ListItemDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ListItemDemo>;

export const Default: Story = { args: { variant: 'default', label: 'Sales region' } };
export const Identifier: Story = { args: { variant: 'identifier', name: 'Alice Johnson', status: 'active', showStatus: true, onLabel: 'Active', offLabel: 'Inactive' } };
