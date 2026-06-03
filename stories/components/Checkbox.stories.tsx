import type { Meta, StoryObj } from '@storybook/react';
import { useCheckbox } from '../../src/components/Checkbox';
import type { CheckboxProps } from '../../src/components/Checkbox';

function CheckboxDemo({
  label = 'Checkbox label',
  checked = false,
  disabled = false,
  showLabel = true,
  onChange,
}: CheckboxProps) {
  const { resolvedChecked, focused, handleClick, handleKeyDown, focusProps } = useCheckbox({ checked, onChange, disabled });

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="checkbox"
      aria-checked={resolvedChecked}
      aria-disabled={disabled}
      {...focusProps}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: 3,
        border: `2px solid ${focused ? '#0066cc' : disabled ? '#ccc' : resolvedChecked ? '#111' : '#ccc'}`,
        background: resolvedChecked && !disabled ? '#111' : '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {resolvedChecked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      {showLabel && (
        <span style={{ fontSize: 13, color: disabled ? '#ccc' : '#111' }}>{label}</span>
      )}
    </div>
  );
}

const meta: Meta<typeof CheckboxDemo> = {
  title: 'Stilo/Components - Passive/Checkbox',
  component: CheckboxDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof CheckboxDemo>;

export const Default: Story = { args: { label: 'Accept terms', checked: false, disabled: false, showLabel: true } };
export const Checked: Story = { args: { label: 'Accept terms', checked: true, disabled: false, showLabel: true } };
export const Disabled: Story = { args: { label: 'Disabled option', checked: false, disabled: true, showLabel: true } };
