import type { Meta, StoryObj } from '@storybook/react';
import { useFormBlockRow } from '../../src/components/FormBlockSettings';
import type { FormBlockSettingsProps } from '../../src/components/FormBlockSettings';

const DEMO_ROWS = [
  {
    title: 'Notification method',
    description: 'How you receive notifications',
    fields: [
      { type: 'combobox' as const, label: 'Channel', items: [{ value: 'email', label: 'Email' }, { value: 'sms', label: 'SMS' }] },
    ] as [import('../../src/components/FormBlockSettings').FormBlockFieldDef],
  },
  {
    title: 'Auto-save',
    description: 'Save changes automatically',
    fields: [
      { type: 'toggle' as const, label: 'Enabled' },
    ] as [import('../../src/components/FormBlockSettings').FormBlockFieldDef],
  },
];

function FormBlockSettingsDemo({
  title = 'Settings',
  rows = DEMO_ROWS,
  showDescriptions = true,
}: FormBlockSettingsProps) {
  const { toggleStates, setToggle } = useFormBlockRow();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 480, border: '1px solid #e0e0e0', borderRadius: 8, background: '#fff' }}>
      {title && (
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0', fontWeight: 600, fontSize: 14, color: '#111' }}>
          {title}
        </div>
      )}
      {rows.map((row, ri) => (
        <div key={ri} style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0', display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{row.title}</div>
            {showDescriptions && row.description && (
              <div style={{ fontSize: 12, color: '#555', marginTop: 2 }}>{row.description}</div>
            )}
          </div>
          <div>
            {row.fields.map((field, fi) => {
              if (field.type === 'toggle') {
                return (
                  <div
                    key={fi}
                    onClick={() => setToggle(fi, !toggleStates[fi])}
                    style={{
                      width: 40, height: 22, borderRadius: 11,
                      background: toggleStates[fi] ? '#111' : '#e0e0e0',
                      position: 'relative', cursor: 'pointer', transition: 'background 0.15s',
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 2, left: toggleStates[fi] ? 20 : 2,
                      width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.15s',
                    }} />
                  </div>
                );
              }
              if (field.type === 'combobox') {
                return (
                  <select key={fi} style={{ fontSize: 12, padding: '5px 8px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111' }}>
                    {field.items?.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                  </select>
                );
              }
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

const meta: Meta<typeof FormBlockSettingsDemo> = {
  title: 'Stilo/Component Sets/FormBlockSettings',
  component: FormBlockSettingsDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FormBlockSettingsDemo>;

export const Default: Story = {
  args: { title: 'Settings', rows: DEMO_ROWS, showDescriptions: true },
};
