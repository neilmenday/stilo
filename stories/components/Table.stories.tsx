import type { Meta, StoryObj } from '@storybook/react';
import { useTable } from '../../src/components/Table';
import type { TableProps } from '../../src/components/Table';

const SAMPLE_COLUMNS = [
  { key: 'name', title: 'Name' },
  { key: 'region', title: 'Region' },
  { key: 'status', title: 'Status' },
];

const SAMPLE_ROWS = [
  { name: 'Alice Johnson', region: 'North', status: 'Active' },
  { name: 'Bob Smith', region: 'South', status: 'Inactive' },
  { name: 'Carol White', region: 'East', status: 'Active' },
  { name: 'David Lee', region: 'West', status: 'Active' },
];

function TableDemo({
  columns = SAMPLE_COLUMNS,
  rows = SAMPLE_ROWS as Record<string, unknown>[],
  showCheckbox = true,
}: TableProps) {
  const typedColumns = (columns as typeof SAMPLE_COLUMNS);
  const typedRows = (rows as Record<string, unknown>[]);

  const { selectedRows, sortKey, sortDir, allSelected, sortedRows, toggleRow, toggleAll, handleSort } =
    useTable({ columns: typedColumns, rows: typedRows });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 500 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            {showCheckbox && (
              <th style={{ width: 36, padding: '8px 12px', borderBottom: '1px solid #e0e0e0' }}>
                <input type="checkbox" checked={allSelected} onChange={e => toggleAll(e.target.checked)} />
              </th>
            )}
            {typedColumns.map(col => (
              <th
                key={col.key}
                onClick={() => handleSort(col.key)}
                style={{
                  textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: '#555',
                  fontSize: 11, borderBottom: '1px solid #e0e0e0', cursor: 'pointer', userSelect: 'none',
                }}
              >
                {col.title}
                {sortKey === col.key && (
                  <span style={{ marginLeft: 4 }}>{sortDir === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedRows.map((row, i) => (
            <tr key={i} style={{ background: selectedRows.has(i) ? '#f5f5f5' : '#fff' }}>
              {showCheckbox && (
                <td style={{ padding: '8px 12px', borderBottom: '1px solid #e0e0e0' }}>
                  <input type="checkbox" checked={selectedRows.has(i)} onChange={e => toggleRow(i, e.target.checked)} />
                </td>
              )}
              {typedColumns.map(col => (
                <td key={col.key} style={{ padding: '8px 12px', color: '#111', borderBottom: '1px solid #e0e0e0' }}>
                  {String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRows.size > 0 && (
        <div style={{ marginTop: 8, fontSize: 12, color: '#555' }}>{selectedRows.size} row{selectedRows.size > 1 ? 's' : ''} selected</div>
      )}
    </div>
  );
}

const meta: Meta<typeof TableDemo> = {
  title: 'Stilo/Components/Table',
  component: TableDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TableDemo>;

export const Default: Story = {
  args: {
    columns: SAMPLE_COLUMNS,
    rows: SAMPLE_ROWS,
    showCheckbox: true,
  },
};
