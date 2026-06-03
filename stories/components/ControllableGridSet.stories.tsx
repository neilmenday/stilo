import type { Meta, StoryObj } from '@storybook/react';
import { useControllableGridSet } from '../../src/components/ControllableGridSet';
import type { ControllableGridSetProps, GridItem } from '../../src/components/ControllableGridSet';

const SAMPLE_ITEMS: GridItem[] = [
  { id: '1', title: 'North Region', metaLabel: '12 records', status: 'active' },
  { id: '2', title: 'South Region', metaLabel: '8 records', status: 'inactive' },
  { id: '3', title: 'East Region', metaLabel: '5 records', status: 'active' },
  { id: '4', title: 'West Region', metaLabel: '20 records', status: 'active' },
];

function ControllableGridSetDemo({
  items = SAMPLE_ITEMS,
  searchLabel = 'Search',
  buttonLabel = 'Add item',
}: ControllableGridSetProps) {
  const { searchText, setSearchText, filteredItems, selectedItem, setSelectedItem, onClose } =
    useControllableGridSet({ items });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 480 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {filteredItems.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            style={{
              border: `1px solid ${selectedItem?.id === item.id ? '#0066cc' : '#e0e0e0'}`,
              borderRadius: 8, padding: '12px 14px', cursor: 'pointer', background: '#fff',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 13, color: '#111' }}>{item.title}</div>
            <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{item.metaLabel}</div>
            <div style={{
              marginTop: 6, fontSize: 11, display: 'inline-block', padding: '2px 6px', borderRadius: 10,
              background: item.status === 'active' ? '#e0e0e0' : '#f5f5f5',
              color: item.status === 'active' ? '#111' : '#555',
            }}>
              {item.status}
            </div>
          </div>
        ))}
      </div>
      {selectedItem && (
        <div style={{ marginTop: 12, padding: '10px 14px', background: '#f5f5f5', borderRadius: 4, fontSize: 13 }}>
          Selected: <strong>{selectedItem.title}</strong>
          <button onClick={onClose} style={{ marginLeft: 8, fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof ControllableGridSetDemo> = {
  title: 'Stilo/Components/ControllableGridSet',
  component: ControllableGridSetDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ControllableGridSetDemo>;

export const Default: Story = {
  args: {
    items: SAMPLE_ITEMS,
    searchLabel: 'Search',
    buttonLabel: 'Add item',
  },
};
