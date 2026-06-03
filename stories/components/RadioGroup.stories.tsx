import type { Meta, StoryObj } from '@storybook/react';
import { useRadioGroup } from '../../src/components/RadioGroup';
import type { RadioGroupProps } from '../../src/components/RadioGroup';

const DEFAULT_OPTIONS = [
  { value: 'option-a', label: 'Option A' },
  { value: 'option-b', label: 'Option B' },
  { value: 'option-c', label: 'Option C' },
];

function RadioGroupDemo({
  label = 'Select option',
  options = DEFAULT_OPTIONS,
  value: valueProp,
  onChange,
  disabled = false,
  orientation = 'vertical',
  hint,
  error,
}: RadioGroupProps) {
  const { value, handleChange } = useRadioGroup({ valueProp, onChange });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 280 }}>
      {label && <div style={{ fontSize: 12, fontWeight: 600, color: '#111', marginBottom: 8 }}>{label}</div>}
      <div style={{ display: 'flex', flexDirection: orientation === 'horizontal' ? 'row' : 'column', gap: 10 }}>
        {(options ?? []).map(opt => {
          const isSelected = value === opt.value;
          return (
            <label
              key={opt.value}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, cursor: disabled || opt.disabled ? 'not-allowed' : 'pointer',
                opacity: opt.disabled ? 0.5 : 1,
              }}
            >
              <div
                onClick={() => !disabled && !opt.disabled && handleChange(opt.value)}
                style={{
                  width: 16, height: 16, borderRadius: '50%',
                  border: `2px solid ${isSelected ? '#111' : '#ccc'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {isSelected && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#111' }} />}
              </div>
              <span style={{ fontSize: 13, color: disabled ? '#ccc' : '#111' }}>{opt.label}</span>
            </label>
          );
        })}
      </div>
      {hint && !error && <div style={{ fontSize: 12, color: '#555', marginTop: 6 }}>{hint}</div>}
      {error && <div style={{ fontSize: 12, color: '#c00', marginTop: 6 }}>{error}</div>}
    </div>
  );
}

const meta: Meta<typeof RadioGroupDemo> = {
  title: 'Stilo/Components - Passive/RadioGroup',
  component: RadioGroupDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof RadioGroupDemo>;

export const Default: Story = {
  args: {
    label: 'Notification frequency',
    options: DEFAULT_OPTIONS,
    orientation: 'vertical',
    disabled: false,
  },
};
export const Horizontal: Story = {
  args: {
    label: 'View mode',
    options: [{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid' }],
    orientation: 'horizontal',
  },
};
