import type { Meta, StoryObj } from '@storybook/react';
import { useTableSet } from '../../src/components/TableSet';
import type { TableSetProps } from '../../src/components/TableSet';

const COLS = [{ key: 'name', title: 'Name' }, { key: 'status', title: 'Status' }];
const ROWS = [{ name: 'Alice', status: 'Active' }, { name: 'Bob', status: 'Inactive' }, { name: 'Carol', status: 'Active' }];

function TableSetDemo({ columns = COLS, rows = ROWS, variant = 'drawer' }: TableSetProps) {
  const { selectedRow, setSelectedRow, isDirty, setIsDirty, onClose, handleSave } = useTableSet();
  const typedCols = columns as typeof COLS;
  const typedRows = rows as typeof ROWS;

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 440 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr style={{ background: '#f5f5f5' }}>
            {typedCols.map(col => (
              <th key={col.key} style={{ textAlign: 'left', padding: '8px 12px', fontWeight: 600, color: '#555', fontSize: 11, borderBottom: '1px solid #e0e0e0' }}>
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {typedRows.map((row, i) => (
            <tr
              key={i}
              onClick={() => { setSelectedRow(row); setIsDirty(false); }}
              style={{ cursor: 'pointer', background: selectedRow === row ? '#f5f5f5' : '#fff' }}
            >
              {typedCols.map(col => (
                <td key={col.key} style={{ padding: '8px 12px', color: '#111', borderBottom: '1px solid #e0e0e0' }}>
                  {String((row as Record<string,string>)[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRow && (
        <div style={{ marginTop: 12, padding: '12px 14px', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 13 }}>
          <div style={{ fontWeight: 600, color: '#111', marginBottom: 8 }}>
            Panel ({variant}): {String((selectedRow as Record<string,string>)['name'] ?? '')}
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={onClose} style={{ padding: '5px 10px', border: '1px solid #e0e0e0', borderRadius: 4, background: 'transparent', cursor: 'pointer', fontSize: 12, color: '#111' }}>Close</button>
            <button onClick={handleSave} style={{ padding: '5px 10px', border: 'none', borderRadius: 4, background: '#111', color: '#fff', cursor: 'pointer', fontSize: 12 }}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof TableSetDemo> = {
  title: 'Stilo/Component Sets/TableSet',
  component: TableSetDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TableSetDemo>;

export const Default: Story = { args: { columns: COLS, rows: ROWS, variant: 'drawer' } };
