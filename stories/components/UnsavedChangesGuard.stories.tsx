import type { Meta, StoryObj } from '@storybook/react';
import { useUnsavedChanges } from '../../src/components/UnsavedChangesGuard';
import type { UnsavedChangesGuardProps } from '../../src/components/UnsavedChangesGuard';

function UnsavedChangesGuardDemo({
  variant = 'inline',
  message = 'You have unsaved changes. Do you want to save before leaving?',
}: UnsavedChangesGuardProps) {
  const { isDirty, showWarning, markDirty, markClean, guardNavigation, confirmDiscard, dismissWarning } =
    useUnsavedChanges();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 400 }}>
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, color: '#555', marginBottom: 8 }}>
          State: <strong style={{ color: isDirty ? '#c00' : '#111' }}>{isDirty ? 'Dirty (unsaved changes)' : 'Clean'}</strong>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={markDirty}
            style={{ fontSize: 12, padding: '5px 10px', border: '1px solid #e0e0e0', borderRadius: 4, cursor: 'pointer', background: '#fff', color: '#111' }}
          >Simulate change</button>
          <button
            onClick={() => guardNavigation(() => alert('Navigated!'))}
            style={{ fontSize: 12, padding: '5px 10px', border: '1px solid #e0e0e0', borderRadius: 4, cursor: 'pointer', background: '#fff', color: '#111' }}
          >Navigate away</button>
        </div>
      </div>

      {showWarning && (
        <div style={{
          padding: '14px 16px', border: '1px solid #e0e0e0', borderRadius: 8,
          background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }}>
          <div style={{ fontSize: 13, color: '#111', marginBottom: 12 }}>{message}</div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              onClick={dismissWarning}
              style={{ fontSize: 12, padding: '5px 10px', border: '1px solid #e0e0e0', borderRadius: 4, cursor: 'pointer', background: 'transparent', color: '#111' }}
            >Keep editing</button>
            <button
              onClick={confirmDiscard}
              style={{ fontSize: 12, padding: '5px 10px', border: '1px solid #e0e0e0', borderRadius: 4, cursor: 'pointer', background: 'transparent', color: '#c00' }}
            >Discard</button>
            <button
              onClick={markClean}
              style={{ fontSize: 12, padding: '5px 10px', border: 'none', borderRadius: 4, cursor: 'pointer', background: '#111', color: '#fff' }}
            >Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof UnsavedChangesGuardDemo> = {
  title: 'Stilo/Foundations/UnsavedChangesGuard',
  component: UnsavedChangesGuardDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof UnsavedChangesGuardDemo>;

export const Default: Story = {
  args: {
    variant: 'inline',
    message: 'You have unsaved changes. Save or discard before leaving.',
    show: false,
    onSave: () => {},
    onDiscard: () => {},
    onDismiss: () => {},
  },
};
