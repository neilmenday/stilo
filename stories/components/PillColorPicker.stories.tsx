import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { PillColorPickerProps } from '../../src/components/PillColorPicker';
import { PILL_COLOR_PRESETS } from '../../src/components/PillColorPicker';

function PillColorPickerDemo({ label = 'Colour', value: valueProp, onChange }: PillColorPickerProps) {
  const [value, setValue] = useState(valueProp ?? PILL_COLOR_PRESETS[0]);

  const handleChange = (hex: string) => {
    setValue(hex);
    onChange?.(hex);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 280 }}>
      {label && <div style={{ fontSize: 12, color: '#555', marginBottom: 8 }}>{label}</div>}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {PILL_COLOR_PRESETS.map(hex => (
          <button
            key={hex}
            onClick={() => handleChange(hex)}
            style={{
              width: 28, height: 28, borderRadius: '50%', background: hex,
              border: value === hex ? '3px solid #111' : '2px solid transparent',
              cursor: 'pointer', outline: value === hex ? `2px solid #fff` : 'none',
              outlineOffset: value === hex ? '-5px' : '0',
            }}
            title={hex}
          />
        ))}
        <input
          type="color"
          value={value}
          onChange={e => handleChange(e.target.value)}
          style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #e0e0e0', cursor: 'pointer', padding: 0 }}
        />
      </div>
      <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px', borderRadius: 12, background: `${value}22`, border: `1px solid ${value}`, fontSize: 12, color: '#111' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: value }} />
        {value}
      </div>
    </div>
  );
}

const meta: Meta<typeof PillColorPickerDemo> = {
  title: 'Stilo/Component Sets/PillColorPicker',
  component: PillColorPickerDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof PillColorPickerDemo>;

export const Default: Story = { args: { label: 'Choose pill colour' } };
