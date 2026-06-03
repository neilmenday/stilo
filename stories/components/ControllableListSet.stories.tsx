import type { Meta, StoryObj } from '@storybook/react';
import { useControllableListSet } from '../../src/components/ControllableListSet';
import type { ControllableListSetProps, ListItem } from '../../src/components/ControllableListSet';

const SAMPLE_ITEMS: ListItem[] = [
  { id: '1', identifierLabel: 'Alice Johnson', status: 'active', metaLabel: 'Manager', tags: ['Sales'] },
  { id: '2', identifierLabel: 'Bob Smith', status: 'inactive', metaLabel: 'Rep', tags: ['Marketing'] },
  { id: '3', identifierLabel: 'Carol White', status: 'active', metaLabel: 'Director', tags: ['Sales'] },
];

function ControllableListSetDemo({
  items = SAMPLE_ITEMS,
  identifierTitle = 'Name',
  statusTitle = 'Status',
  searchLabel = 'Search',
  buttonLabel = 'Add',
}: ControllableListSetProps) {
  const {
    searchText, setSearchText, enrichedRows, allSelected, handleSelectAll,
  } = useControllableListSet({ items, identifierTitle, statusTitle });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 500 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder={searchLabel}
          style={{ flex: 1, fontSize: 13, padding: '6px 10px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111' }}
        />
        {buttonLabel && (
          <button style={{ fontSize: 12, padding: '6px 12px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
            + {buttonLabel}
          </button>
        )}
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '32px 1fr 80px',
          background: '#f5f5f5', padding: '8px 12px',
          fontSize: 11, fontWeight: 600, color: '#555', gap: 12,
        }}>
          <input type="checkbox" checked={allSelected} onChange={e => handleSelectAll(e.target.checked)} />
          <span>{identifierTitle}</span>
          <span>{statusTitle}</span>
        </div>
        {enrichedRows.map(row => (
          <div key={row.id} style={{
            display: 'grid', gridTemplateColumns: '32px 1fr 80px',
            padding: '8px 12px', borderTop: '1px solid #e0e0e0', gap: 12,
            background: row.rowChecked ? '#f5f5f5' : '#fff',
          }}>
            <input type="checkbox" checked={!!row.rowChecked} onChange={e => row.onRowCheck?.(e.target.checked)} />
            <span style={{ fontSize: 13, color: '#111' }}>{row.identifierLabel}</span>
            <span style={{ fontSize: 12, color: row.status === 'active' ? '#111' : '#555' }}>{row.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const meta: Meta<typeof ControllableListSetDemo> = {
  title: 'Stilo/Component Sets/ControllableListSet',
  component: ControllableListSetDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ControllableListSetDemo>;

export const Default: Story = {
  args: {
    items: SAMPLE_ITEMS,
    identifierTitle: 'Name',
    statusTitle: 'Status',
    searchLabel: 'Search',
    buttonLabel: 'Add',
  },
};
