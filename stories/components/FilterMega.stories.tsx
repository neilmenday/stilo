import type { Meta, StoryObj } from '@storybook/react';
import { useFilterMega } from '../../src/components/FilterMega';
import type { FilterMegaProps } from '../../src/components/FilterMega';

const DEMO_FIELDS = [
  { key: 'region', label: 'Region', type: 'combobox' as const, items: [{ value: 'north', label: 'North' }, { value: 'south', label: 'South' }] },
  { key: 'status', label: 'Status', type: 'combobox' as const, items: [{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }] },
];

function FilterMegaDemo({
  label = 'Filter',
  fields = DEMO_FIELDS,
  onChange,
}: FilterMegaProps) {
  const { open, hovered, values, displayValue, ref, toggle, setFieldValue, hoverProps } =
    useFilterMega({ onChange });

  return (
    <div ref={ref} style={{ fontFamily: 'system-ui, sans-serif', position: 'relative', display: 'inline-block' }}>
      <div
        onClick={toggle}
        {...hoverProps}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '6px 12px', border: `1px solid ${open ? '#0066cc' : hovered ? '#ccc' : '#e0e0e0'}`,
          borderRadius: 4, cursor: 'pointer', background: '#fff', fontSize: 13, color: '#111',
        }}
      >
        <span>▼</span>
        <span>{displayValue || label}</span>
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 10, marginTop: 4,
          background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8,
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)', padding: 16, width: 280,
        }}>
          {(fields ?? []).map(field => (
            <div key={field.key} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#555', marginBottom: 4 }}>{field.label}</div>
              <select
                value={values[field.key] ?? ''}
                onChange={e => setFieldValue(field.key, e.target.value)}
                style={{ width: '100%', fontSize: 13, padding: '6px 8px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111' }}
              >
                <option value="">All</option>
                {field.items?.map(item => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof FilterMegaDemo> = {
  title: 'Stilo/Components/FilterMega',
  component: FilterMegaDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FilterMegaDemo>;

export const Default: Story = {
  args: {
    label: 'Filter',
    fields: DEMO_FIELDS,
  },
};
