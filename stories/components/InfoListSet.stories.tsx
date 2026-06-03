import type { Meta, StoryObj } from '@storybook/react';
import { useInfoListSet } from '../../src/components/InfoListSet';
import type { InfoListSetProps, InfoListRow } from '../../src/components/InfoListSet';

const DEMO_ROWS: InfoListRow[] = [
  { id: '1', identifierLabel: 'Alice Johnson', avatarInitials: 'AJ', status: 'active', metaLabel: 'Sales' },
  { id: '2', identifierLabel: 'Bob Smith', avatarInitials: 'BS', status: 'inactive', metaLabel: 'Marketing' },
  { id: '3', identifierLabel: 'Carol White', avatarInitials: 'CW', status: 'active', metaLabel: 'Engineering' },
];

function InfoListSetDemo({
  rows = DEMO_ROWS,
  identifierTitle = 'Name',
  statusTitle = 'Status',
}: InfoListSetProps) {
  const { selected, handleIdentifierClick, onClose } = useInfoListSet({ rows });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 480, border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 80px', padding: '8px 14px', background: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#555' }}>{identifierTitle}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#555' }}>{statusTitle}</span>
      </div>
      {rows.map(row => (
        <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '1fr 80px', padding: '10px 14px', borderBottom: '1px solid #e0e0e0', alignItems: 'center', background: selected?.id === row.id ? '#f5f5f5' : '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#111' }}>
              {row.avatarInitials}
            </div>
            <span
              onClick={() => handleIdentifierClick(row)}
              style={{ fontSize: 13, fontWeight: 600, color: '#0066cc', cursor: 'pointer' }}
            >{row.identifierLabel}</span>
          </div>
          <span style={{ fontSize: 12, color: row.status === 'active' ? '#111' : '#555' }}>{row.status}</span>
        </div>
      ))}
      {selected && (
        <div style={{ padding: '10px 14px', background: '#f5f5f5', fontSize: 13 }}>
          Panel: {selected.identifierLabel}
          <button onClick={onClose} style={{ marginLeft: 8, fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof InfoListSetDemo> = {
  title: 'Stilo/Components/InfoListSet',
  component: InfoListSetDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof InfoListSetDemo>;

export const Default: Story = {
  args: { rows: DEMO_ROWS, identifierTitle: 'Name', statusTitle: 'Status' },
};
