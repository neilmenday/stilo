import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useTextarea } from '../../src/components/Textarea';
import type { TextareaProps } from '../../src/components/Textarea';

function TextareaDemo({
  label = 'Description',
  showLabel = true,
  placeholder = 'Enter text…',
  disabled = false,
  rows = 4,
  maxLength,
  error = false,
  errorMessage,
  helperText,
  value: valueProp,
  onChange,
}: TextareaProps) {
  const [value, setValue] = useState(valueProp ?? '');
  const { focused, hovered, hoverProps, focusProps } = useTextarea();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 320 }}>
      {showLabel && (
        <label style={{ display: 'block', fontSize: 12, color: '#555', marginBottom: 4 }}>{label}</label>
      )}
      <div
        {...hoverProps}
        style={{
          border: `1px solid ${error ? '#c00' : focused ? '#0066cc' : hovered ? '#ccc' : '#e0e0e0'}`,
          borderRadius: 4, background: disabled ? '#f5f5f5' : '#fff',
          transition: 'border-color 0.15s',
        }}
      >
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          {...focusProps}
          style={{
            display: 'block', width: '100%', border: 'none', outline: 'none',
            padding: '7px 10px', resize: 'vertical', fontFamily: 'system-ui, sans-serif',
            fontSize: 13, color: '#111', background: 'transparent', boxSizing: 'border-box',
          }}
        />
      </div>
      {maxLength && (
        <div style={{ fontSize: 11, color: '#555', textAlign: 'right', marginTop: 2 }}>
          {value.length} / {maxLength}
        </div>
      )}
      {error && errorMessage && <div style={{ fontSize: 12, color: '#c00', marginTop: 4 }}>{errorMessage}</div>}
      {!error && helperText && <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{helperText}</div>}
    </div>
  );
}

const meta: Meta<typeof TextareaDemo> = {
  title: 'Stilo/Components - Passive/Textarea',
  component: TextareaDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof TextareaDemo>;

export const Default: Story = { args: { label: 'Notes', placeholder: 'Enter notes…', rows: 4, showLabel: true } };
export const WithMaxLength: Story = { args: { label: 'Bio', placeholder: 'Write a short bio…', maxLength: 200, rows: 4 } };
export const WithError: Story = { args: { label: 'Description', error: true, errorMessage: 'This field is required.' } };
