import type { Meta, StoryObj } from '@storybook/react';
import { useConditionBuilder } from '../../src/components/ConditionBuilder';
import type { ConditionBuilderProps } from '../../src/components/ConditionBuilder';
import type { ComboboxItem } from '../../src/components/Combobox';

const FIELD_OPTIONS: ComboboxItem[] = [
  { value: 'name', label: 'Name' },
  { value: 'status', label: 'Status' },
  { value: 'region', label: 'Region' },
];

const CONDITION_OPTIONS: ComboboxItem[] = [
  { value: 'eq', label: 'equals' },
  { value: 'neq', label: 'does not equal' },
  { value: 'contains', label: 'contains' },
];

function ConditionBuilderDemo({
  fieldOptions = FIELD_OPTIONS,
  conditionOptions = CONDITION_OPTIONS,
  maxRows = 5,
  onChange,
}: ConditionBuilderProps) {
  const { rows, addRow, removeRow, patch, canAdd } = useConditionBuilder({ maxRows, onChange });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 560 }}>
      <div style={{ fontSize: 12, color: '#555', marginBottom: 8 }}>Conditions</div>
      {rows.map((row, i) => (
        <div key={row.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          {i > 0 && (
            <div style={{
              fontSize: 11, color: '#555', border: '1px solid #e0e0e0', borderRadius: 3,
              padding: '3px 6px', cursor: 'pointer', background: '#f5f5f5',
            }}
              onClick={() => patch(row.id, { logic: row.logic === 'AND' ? 'OR' : 'AND' })}
            >
              {row.logic}
            </div>
          )}
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
            <button
              onClick={() => removeRow(row.id)}
              style={{ fontSize: 12, color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}
            >✕</button>
          )}
        </div>
      ))}
      {canAdd && (
        <button
          onClick={addRow}
          style={{
            marginTop: 4, fontSize: 12, color: '#0066cc',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          }}
        >+ Add condition</button>
      )}
    </div>
  );
}

const meta: Meta<typeof ConditionBuilderDemo> = {
  title: 'Stilo/Component Sets/ConditionBuilder',
  component: ConditionBuilderDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ConditionBuilderDemo>;

export const Default: Story = {
  args: {
    fieldOptions: FIELD_OPTIONS,
    conditionOptions: CONDITION_OPTIONS,
    maxRows: 5,
  },
};
