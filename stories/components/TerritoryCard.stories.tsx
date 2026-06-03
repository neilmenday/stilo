import type { Meta, StoryObj } from '@storybook/react';
import type { TerritoryCardProps } from '../../src/components/TerritoryCard';

function TerritoryCardDemo({
  title = 'North Region',
  checked = false,
  metaLabel = '12 records',
  status = 'active',
  dotMenuItems = ['Edit', 'Duplicate', 'Delete'],
  onCheck,
  onCardClick,
}: TerritoryCardProps) {
  return (
    <div
      style={{
        width: 240, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden',
        background: '#fff', fontFamily: 'system-ui, sans-serif', cursor: 'pointer',
      }}
      onClick={onCardClick}
    >
      <div style={{ height: 100, background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#555' }}>
        Map area
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#111' }}>{title}</div>
            <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{metaLabel}</div>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={checked}
              onChange={e => { e.stopPropagation(); onCheck?.(e.target.checked); }}
            />
            <div style={{ cursor: 'pointer', fontSize: 16, color: '#555' }}>⋮</div>
          </div>
        </div>
        <div style={{ marginTop: 8, display: 'inline-block', fontSize: 11, padding: '2px 6px', borderRadius: 10, background: status === 'active' ? '#e0e0e0' : '#f5f5f5', color: status === 'active' ? '#111' : '#555' }}>
          {status}
        </div>
      </div>
    </div>
  );
}

const meta: Meta<typeof TerritoryCardDemo> = {
  title: 'Stilo/Components/TerritoryCard',
  component: TerritoryCardDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TerritoryCardDemo>;

export const Default: Story = {
  args: {
    title: 'North Region',
    metaLabel: '12 records',
    status: 'active',
    checked: false,
  },
};
