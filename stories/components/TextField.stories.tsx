import type { Meta, StoryObj } from '@storybook/react';
import { useTextField } from '../../src/components/TextField';
import type { TextFieldProps } from '../../src/components/TextField';

function TextFieldDemo({
  label = 'Label',
  showLabel = true,
  placeholder = 'Enter value…',
  disabled = false,
  required = false,
  value,
  onChange,
  helperText,
  errorText,
  variant = 'Default',
}: TextFieldProps) {
  const { inputVal, isActiveInteraction, handleChange, hoverProps, focusProps } = useTextField({
    value, onChange, disabled,
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 280 }}>
      {showLabel && (
        <label style={{ display: 'block', fontSize: 12, color: '#555', marginBottom: 4 }}>
          {label}{required && <span style={{ color: '#c00', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <div
        {...hoverProps}
        style={{
          border: `1px solid ${errorText ? '#c00' : isActiveInteraction ? '#0066cc' : '#e0e0e0'}`,
          borderRadius: 4, background: disabled ? '#f5f5f5' : '#fff',
          transition: 'border-color 0.15s',
        }}
      >
        <input
          value={inputVal}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          type={variant === 'Number field' || variant === 'Inline number field' ? 'number' : 'text'}
          {...focusProps}
          style={{
            display: 'block', width: '100%', border: 'none', outline: 'none',
            padding: '7px 10px', fontFamily: 'system-ui, sans-serif',
            fontSize: 13, color: disabled ? '#ccc' : '#111', background: 'transparent',
            boxSizing: 'border-box',
          }}
        />
      </div>
      {errorText && <div style={{ fontSize: 12, color: '#c00', marginTop: 4 }}>{errorText}</div>}
      {!errorText && helperText && <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{helperText}</div>}
    </div>
  );
}

const meta: Meta<typeof TextFieldDemo> = {
  title: 'Stilo/Components/TextField',
  component: TextFieldDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TextFieldDemo>;

export const Default: Story = { args: { label: 'Email', placeholder: 'Enter email', showLabel: true } };
export const Required: Story = { args: { label: 'Name', placeholder: 'Enter name', required: true, showLabel: true } };
export const WithError: Story = { args: { label: 'Email', placeholder: 'Enter email', errorText: 'Invalid email address', showLabel: true } };
export const Disabled: Story = { args: { label: 'Read only', placeholder: 'Not editable', disabled: true, showLabel: true } };
export const NumberField: Story = { args: { label: 'Quantity', placeholder: '0', variant: 'Number field', showLabel: true } };
