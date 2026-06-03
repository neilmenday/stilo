import type { Meta, StoryObj } from '@storybook/react';
import { useControllableTableSet } from '../../src/components/ControllableTableSet';
import type { ControllableTableSetProps } from '../../src/components/ControllableTableSet';

const SAMPLE_COLS = [
  { key: 'name', title: 'Name' },
  { key: 'region', title: 'Region' },
  { key: 'status', title: 'Status' },
];

const SAMPLE_ROWS = [
  { name: 'Alice', region: 'North', status: 'Active' },
  { name: 'Bob', region: 'South', status: 'Inactive' },
  { name: 'Carol', region: 'East', status: 'Active' },
];

function ControllableTableSetDemo({
  columns = SAMPLE_COLS,
  rows = SAMPLE_ROWS,
  searchLabel = 'Search',
}: ControllableTableSetProps) {
  const { searchText, setSearchText, filteredRows, selectedRow, setSelectedRow, onClose } =
    useControllableTableSet({ columns: SAMPLE_COLS, rows: SAMPLE_ROWS });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 480 }}>
      <div style={{ marginBottom: 10 }}>
        <input
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder={searchLabel}
          style={{ fontSize: 13, padding: '6px 10px', border: '1px solid #e0e0e0', borderRadius: 4, width: '100%', color: '#111', boxSizing: 'border-box' }}
        />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            {SAMPLE_COLS.map(col => (
              <th key={col.key} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: '#555', fontSize: 11, borderBottom: '1px solid #e0e0e0' }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {(filteredRows as Record<string, unknown>[]).map((row, i) => (
            <tr
              key={i}
              onClick={() => setSelectedRow(row)}
              style={{ cursor: 'pointer', background: selectedRow === row ? '#f5f5f5' : '#fff' }}
            >
              {SAMPLE_COLS.map(col => (
                <td key={col.key} style={{ padding: '8px 12px', color: '#111', borderBottom: '1px solid #e0e0e0' }}>
                  {String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRow && (
        <div style={{ marginTop: 10, padding: '8px 12px', background: '#f5f5f5', borderRadius: 4, fontSize: 13 }}>
          Selected: <strong>{String((selectedRow as Record<string,unknown>)['name'] ?? '')}</strong>
          <button onClick={onClose} style={{ marginLeft: 8, fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof ControllableTableSetDemo> = {
  title: 'Stilo/Components/ControllableTableSet',
  component: ControllableTableSetDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ControllableTableSetDemo>;

export const Default: Story = {
  args: {
    columns: SAMPLE_COLS,
    rows: SAMPLE_ROWS,
    searchLabel: 'Search',
  },
};
