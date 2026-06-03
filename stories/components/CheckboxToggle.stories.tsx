import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useCheckboxToggle } from '../../src/components/CheckboxToggle';
import type { CheckboxToggleProps } from '../../src/components/CheckboxToggle';

function CheckboxToggleDemo({
  label = 'Toggle feature',
  showLabel = true,
  disabled = false,
  onLabel = 'On',
  offLabel = 'Off',
  showStatus = true,
}: CheckboxToggleProps) {
  const [checked, setChecked] = useState(false);
  const { focused, hovered, handleClick, handleKeyDown, focusProps, hoverProps } = useCheckboxToggle({
    checked, onChange: setChecked, disabled,
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'system-ui, sans-serif' }}>
      {showLabel && <span style={{ fontSize: 13, color: '#111' }}>{label}</span>}
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...focusProps}
        {...hoverProps}
        style={{
          width: 40, height: 22, borderRadius: 11,
          background: checked ? '#111' : hovered ? '#ccc' : '#e0e0e0',
          position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer',
          outline: focused ? '2px solid #0066cc' : 'none', outlineOffset: 2,
          transition: 'background 0.15s',
        }}
      >
        <div style={{
          position: 'absolute', top: 2, left: checked ? 20 : 2,
          width: 18, height: 18, borderRadius: '50%',
          background: '#fff', transition: 'left 0.15s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
        }} />
      </div>
      {showStatus && (
        <span style={{ fontSize: 12, color: '#555' }}>{checked ? onLabel : offLabel}</span>
      )}
    </div>
  );
}

const meta: Meta<typeof CheckboxToggleDemo> = {
  title: 'Stilo/Components - Passive/CheckboxToggle',
  component: CheckboxToggleDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CheckboxToggleDemo>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
    showLabel: true,
    disabled: false,
    onLabel: 'On',
    offLabel: 'Off',
    showStatus: true,
  },
};
