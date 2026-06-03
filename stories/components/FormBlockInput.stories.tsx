import type { Meta, StoryObj } from '@storybook/react';
import type { FormBlockInputProps } from '../../src/components/FormBlockInput';
import { useState } from 'react';

function FormBlockInputDemo({
  textFieldLabel = 'Name',
  textFieldPlaceholder = 'Enter name...',
  textareaLabel = 'Description',
  textareaPlaceholder = 'Enter description...',
  notification,
  notificationVariant = 'info',
}: FormBlockInputProps) {
  const [textVal, setTextVal] = useState('');
  const [areaVal, setAreaVal] = useState('');

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 400, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={{ display: 'block', fontSize: 12, color: '#555', marginBottom: 4 }}>{textFieldLabel}</label>
        <input
          value={textVal}
          onChange={e => { setTextVal(e.target.value); }}
          placeholder={textFieldPlaceholder}
          style={{ width: '100%', fontSize: 13, padding: '7px 10px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111', boxSizing: 'border-box' }}
        />
      </div>
      <div>
        <label style={{ display: 'block', fontSize: 12, color: '#555', marginBottom: 4 }}>{textareaLabel}</label>
        <textarea
          value={areaVal}
          onChange={e => setAreaVal(e.target.value)}
          placeholder={textareaPlaceholder}
          rows={4}
          style={{ width: '100%', fontSize: 13, padding: '7px 10px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111', resize: 'vertical', boxSizing: 'border-box' }}
        />
      </div>
      {notification && (
        <div style={{ fontSize: 12, padding: '8px 12px', background: '#f5f5f5', border: '1px solid #e0e0e0', borderRadius: 4, color: '#555' }}>
          {notification}
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof FormBlockInputDemo> = {
  title: 'Stilo/Views/SettingsView/FormBlockInput',
  component: FormBlockInputDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FormBlockInputDemo>;

export const Default: Story = {
  args: {
    textFieldLabel: 'Name',
    textFieldPlaceholder: 'Enter name...',
    textareaLabel: 'Description',
    textareaPlaceholder: 'Enter description...',
  },
};
