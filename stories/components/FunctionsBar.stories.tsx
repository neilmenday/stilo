import type { Meta, StoryObj } from '@storybook/react';
import type { FunctionsBarProps } from '../../src/components/FunctionsBar';

function FunctionsBarDemo({
  alignment = 'right',
  cancelLabel = 'Cancel',
  saveLabel = 'Save',
  saveDisabled = false,
  notification,
  onCancel,
  onSave,
}: FunctionsBarProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: alignment === 'right' ? 'flex-end' : 'flex-start',
      gap: 8, padding: '10px 16px',
      borderTop: '1px solid #e0e0e0', background: '#fff',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {notification && (
        <span style={{ fontSize: 12, color: '#555', marginRight: 'auto' }}>{notification}</span>
      )}
      <button
        onClick={onCancel}
        style={{ padding: '7px 14px', background: 'transparent', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 13, cursor: 'pointer', color: '#111' }}
      >
        {cancelLabel}
      </button>
      <button
        onClick={onSave}
        disabled={saveDisabled}
        style={{
          padding: '7px 14px', background: saveDisabled ? '#f5f5f5' : '#111',
          color: saveDisabled ? '#ccc' : '#fff', border: 'none', borderRadius: 4,
          fontSize: 13, cursor: saveDisabled ? 'not-allowed' : 'pointer',
        }}
      >
        {saveLabel}
      </button>
    </div>
  );
}

const meta: Meta<typeof FunctionsBarDemo> = {
  title: 'Stilo/Components/FunctionsBar',
  component: FunctionsBarDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof FunctionsBarDemo>;

export const Default: Story = { args: { alignment: 'right', cancelLabel: 'Cancel', saveLabel: 'Save', saveDisabled: false } };
export const WithNotification: Story = { args: { alignment: 'right', cancelLabel: 'Cancel', saveLabel: 'Save', notification: 'You have unsaved changes' } };
