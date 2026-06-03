import type { Meta, StoryObj } from '@storybook/react';
import type { ModeSpaceProps } from '../../src/components/ModeSpace';

function ModeSpaceDemo({
  saveLabel = 'Save',
  cancelLabel = 'Cancel',
  saveDisabled = false,
  notification,
  onSave,
  onCancel,
}: ModeSpaceProps) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
      borderTop: '1px solid #e0e0e0', background: '#fff',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {notification && (
        <span style={{ flex: 1, fontSize: 12, color: '#555' }}>{notification}</span>
      )}
      {!notification && <div style={{ flex: 1 }} />}
      <button
        onClick={onCancel}
        style={{ padding: '7px 14px', background: 'transparent', border: '1px solid #e0e0e0', borderRadius: 4, fontSize: 13, cursor: 'pointer', color: '#111' }}
      >{cancelLabel}</button>
      <button
        onClick={onSave}
        disabled={saveDisabled}
        style={{
          padding: '7px 14px', background: saveDisabled ? '#f5f5f5' : '#111',
          color: saveDisabled ? '#ccc' : '#fff', border: 'none', borderRadius: 4,
          fontSize: 13, cursor: saveDisabled ? 'not-allowed' : 'pointer',
        }}
      >{saveLabel}</button>
    </div>
  );
}

const meta: Meta<typeof ModeSpaceDemo> = {
  title: 'Stilo/Components/ModeSpace',
  component: ModeSpaceDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof ModeSpaceDemo>;

export const Default: Story = { args: { saveLabel: 'Save changes', cancelLabel: 'Discard', saveDisabled: false } };
export const WithNotification: Story = { args: { saveLabel: 'Save', cancelLabel: 'Cancel', notification: 'You have unsaved changes' } };
