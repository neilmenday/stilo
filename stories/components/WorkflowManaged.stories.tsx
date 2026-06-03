import type { Meta, StoryObj } from '@storybook/react';
import { useWorkflowManagedProvider } from '../../src/components/WorkflowManaged';
import type { WorkflowManagedContextValue } from '../../src/components/WorkflowManaged';

function WorkflowManagedDemo() {
  const { register, unregister, isWorkflowManaged } = useWorkflowManagedProvider();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', width: 360, border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
      <div style={{ fontSize: 12, color: '#555', marginBottom: 10 }}>
        WorkflowManaged tracks whether a workflow overlay is open.
        When active, navigation is prevented.
      </div>
      <div style={{ fontSize: 13, color: '#111', marginBottom: 12 }}>
        Active workflows: <strong>{isWorkflowManaged ? 'Yes — navigation blocked' : 'None'}</strong>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={register}
          style={{ fontSize: 12, padding: '6px 12px', border: '1px solid #e0e0e0', borderRadius: 4, cursor: 'pointer', background: '#fff', color: '#111' }}
        >Open workflow</button>
        <button
          onClick={unregister}
          style={{ fontSize: 12, padding: '6px 12px', border: '1px solid #e0e0e0', borderRadius: 4, cursor: 'pointer', background: '#fff', color: '#555' }}
        >Close workflow</button>
      </div>
    </div>
  );
}

const meta: Meta<typeof WorkflowManagedDemo> = {
  title: 'Stilo/Workflows/WorkflowManaged',
  component: WorkflowManagedDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof WorkflowManagedDemo>;

export const Default: Story = {};
