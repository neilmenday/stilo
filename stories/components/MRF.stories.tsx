import type { Meta, StoryObj } from '@storybook/react';
import { useMRF } from '../../src/components/MRF';
import type { MRFProps, MRFFieldOption } from '../../src/components/MRF';
import type { ComboboxItem } from '../../src/components/Combobox';

const FIELD_OPTIONS: MRFFieldOption[] = [
  { value: 'name', label: 'Name' },
  { value: 'region', label: 'Region' },
  { value: 'status', label: 'Status' },
];

const CONDITION_OPTIONS: ComboboxItem[] = [
  { value: 'eq', label: 'equals' },
  { value: 'neq', label: 'does not equal' },
  { value: 'contains', label: 'contains' },
];

const VALUE_OPTIONS: ComboboxItem[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
];

function MRFDemo({
  variant = 'default',
  fieldOptions = FIELD_OPTIONS,
  conditionOptions = CONDITION_OPTIONS,
  valueOptions = VALUE_OPTIONS,
  maxRows = 5,
  onChange,
}: MRFProps) {
  const { rows, addRow, removeRow, patch, canAdd } = useMRF({ variant, fieldOptions, maxRows, onChange });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 560 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 8 }}>Rule filter</div>
      {rows.map((row, i) => (
        <div key={row.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          {i > 0 && <span style={{ fontSize: 11, color: '#555', minWidth: 28 }}>AND</span>}
          {i === 0 && <span style={{ fontSize: 11, color: '#555', minWidth: 28 }}>IF</span>}
          <select
            value={row.fieldValue ?? ''}
            onChange={e => {
              const item = fieldOptions.find(f => f.value === e.target.value);
              if (item) patch(row.id, { fieldValue: item.value, fieldLabel: item.label });
            }}
            style={{ fontSize: 12, padding: '5px 8px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111' }}
          >
            <option value="">Field...</option>
            {fieldOptions.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
          </select>
          <select
            value={row.conditionValue ?? ''}
            onChange={e => {
              const item = conditionOptions.find(c => c.value === e.target.value);
              if (item) patch(row.id, { conditionValue: item.value, conditionLabel: item.label });
            }}
            style={{ fontSize: 12, padding: '5px 8px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111' }}
          >
            <option value="">Condition...</option>
            {conditionOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <input
            value={row.valueText}
            onChange={e => patch(row.id, { valueText: e.target.value })}
            placeholder="Value..."
            style={{ fontSize: 12, padding: '5px 8px', border: '1px solid #e0e0e0', borderRadius: 4, flex: 1, color: '#111' }}
          />
          {rows.length > 1 && (
            <button onClick={() => removeRow(row.id)} style={{ fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
          )}
        </div>
      ))}
      {canAdd && (
        <button onClick={addRow} style={{ fontSize: 12, color: '#0066cc', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 4 }}>
          + Add rule
        </button>
      )}
    </div>
  );
}

const meta: Meta<typeof MRFDemo> = {
  title: 'Stilo/Component Sets/MRF',
  component: MRFDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof MRFDemo>;

export const Default: Story = {
  args: {
    variant: 'default',
    fieldOptions: FIELD_OPTIONS,
    conditionOptions: CONDITION_OPTIONS,
    valueOptions: VALUE_OPTIONS,
    maxRows: 5,
  },
};
