import type { Meta, StoryObj } from '@storybook/react';
import { useMappingSet } from '../../src/components/MappingSet';
import type { MappingSetProps, MappingSetColumnDef } from '../../src/components/MappingSet';

const DEMO_COLUMNS: MappingSetColumnDef[] = [
  { key: 'source', title: 'Source field', type: 'combobox', items: [{ value: 'name', label: 'Name' }, { value: 'email', label: 'Email' }] },
  { key: 'target', title: 'Target field', type: 'combobox', items: [{ value: 'fullName', label: 'Full Name' }, { value: 'emailAddress', label: 'Email Address' }] },
];

function MappingSetDemo({
  columns = DEMO_COLUMNS,
  addLabel = 'Add mapping',
  maxRows = 10,
  onChange,
}: MappingSetProps) {
  const { rows, addRow, removeRow, patchCombobox } = useMappingSet({ maxRows, onChange });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 500 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 32px', gap: 8, marginBottom: 4 }}>
        {columns.map(col => (
          <div key={col.key} style={{ fontSize: 11, fontWeight: 600, color: '#555' }}>{col.title}</div>
        ))}
        <div />
      </div>
      {rows.map(row => (
        <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 32px', gap: 8, marginBottom: 6, alignItems: 'center' }}>
          {columns.map(col => (
            <select
              key={col.key}
              value={row.values[col.key] ?? ''}
              onChange={e => {
                const item = col.items?.find(i => i.value === e.target.value);
                if (item) patchCombobox(row.id, col.key, item);
              }}
              style={{ fontSize: 12, padding: '5px 8px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111' }}
            >
              <option value="">Select...</option>
              {col.items?.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
          ))}
          <button
            onClick={() => removeRow(row.id)}
            disabled={rows.length <= 1}
            style={{ fontSize: 14, color: '#555', background: 'none', border: 'none', cursor: rows.length <= 1 ? 'default' : 'pointer', opacity: rows.length <= 1 ? 0.3 : 1 }}
          >✕</button>
        </div>
      ))}
      <button
        onClick={addRow}
        style={{ marginTop: 4, fontSize: 12, color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >+ {addLabel}</button>
    </div>
  );
}

const meta: Meta<typeof MappingSetDemo> = {
  title: 'Stilo/Component Sets/MappingSet',
  component: MappingSetDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MappingSetDemo>;

export const Default: Story = { args: { columns: DEMO_COLUMNS, addLabel: 'Add mapping' } };
