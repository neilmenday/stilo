import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useEditWorkflow, useWorkflowStepped } from '../../src/components/Workflows';
import type { EditWorkflowProps, AddWorkflowSteppedProps } from '../../src/components/Workflows';

// ─── EditWorkflow demo ────────────────────────────────────────────────────────
function EditWorkflowDemo({
  title = 'Edit workflow',
  width = 480,
  saveDisabled = false,
}: EditWorkflowProps) {
  const [open, setOpen] = useState(false);
  const { isDirty, setIsDirty, handleSave } = useEditWorkflow({ open, onClose: () => setOpen(false) });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '7px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13 }}
      >
        Open Edit Workflow
      </button>

      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'relative', width, background: '#fff', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.16)' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong style={{ fontSize: 14, color: '#111' }}>{title}</strong>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#555' }}>✕</button>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 12, color: '#555', display: 'block', marginBottom: 4 }}>Workflow name</label>
                <input
                  onChange={() => setIsDirty(true)}
                  placeholder="Enter name..."
                  style={{ width: '100%', fontSize: 13, padding: '7px 10px', border: '1px solid #e0e0e0', borderRadius: 4, color: '#111', boxSizing: 'border-box' }}
                />
              </div>
              {isDirty && <div style={{ fontSize: 12, color: '#555' }}>Unsaved changes</div>}
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setOpen(false)} style={{ padding: '7px 14px', border: '1px solid #e0e0e0', borderRadius: 4, background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#111' }}>Cancel</button>
              <button
                onClick={handleSave}
                disabled={saveDisabled}
                style={{ padding: '7px 14px', border: 'none', borderRadius: 4, background: saveDisabled ? '#f5f5f5' : '#111', color: saveDisabled ? '#ccc' : '#fff', cursor: saveDisabled ? 'not-allowed' : 'pointer', fontSize: 13 }}
              >Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Stepped workflow demo ────────────────────────────────────────────────────
function SteppedWorkflowDemo({
  title = 'Add workflow',
  steps = [{ label: 'Details', content: null }, { label: 'Config', content: null }, { label: 'Review', content: null }],
}: AddWorkflowSteppedProps) {
  const [open, setOpen] = useState(false);
  const { resolvedStep, isFirst, isLast, handleBack, handleNext } = useWorkflowStepped({
    open, totalSteps: steps.length,
  });

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: '7px 14px', background: '#111', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 13, marginLeft: 8 }}
      >
        Open Stepped Workflow
      </button>

      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={() => setOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
          <div style={{ position: 'relative', width: 560, background: '#fff', borderRadius: 8, boxShadow: '0 8px 32px rgba(0,0,0,0.16)' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: 14, color: '#111' }}>{title}</strong>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#555' }}>✕</button>
            </div>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #e0e0e0', display: 'flex', gap: 0 }}>
              {steps.map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: i + 1 < resolvedStep ? '#111' : i + 1 === resolvedStep ? '#111' : '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: i + 1 <= resolvedStep ? '#fff' : '#555' }}>
                      {i + 1 < resolvedStep ? '✓' : i + 1}
                    </div>
                    <div style={{ fontSize: 11, color: i + 1 === resolvedStep ? '#111' : '#555', marginTop: 4 }}>{step.label}</div>
                  </div>
                  {i < steps.length - 1 && <div style={{ flex: 0.5, height: 1, background: i + 1 < resolvedStep ? '#111' : '#e0e0e0', marginBottom: 16 }} />}
                </div>
              ))}
            </div>
            <div style={{ padding: 16, minHeight: 80, fontSize: 13, color: '#555' }}>
              Step {resolvedStep}: {steps[resolvedStep - 1]?.label}
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              {!isFirst && <button onClick={handleBack} style={{ padding: '7px 14px', border: '1px solid #e0e0e0', borderRadius: 4, background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#111' }}>Back</button>}
              {!isLast && <button onClick={handleNext} style={{ padding: '7px 14px', border: 'none', borderRadius: 4, background: '#111', color: '#fff', cursor: 'pointer', fontSize: 13 }}>Next</button>}
              {isLast && <button onClick={() => setOpen(false)} style={{ padding: '7px 14px', border: 'none', borderRadius: 4, background: '#111', color: '#fff', cursor: 'pointer', fontSize: 13 }}>Add</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const meta: Meta<typeof EditWorkflowDemo> = {
  title: 'Stilo/Workflows/Workflows',
  component: EditWorkflowDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof EditWorkflowDemo>;

export const EditWorkflow: Story = { args: { title: 'Edit workflow', width: 480 } };
export const SteppedWorkflow: Story = {
  render: () => (
    <SteppedWorkflowDemo
      open={false}
      onClose={() => {}}
      title="Add workflow"
      steps={[{ label: 'Details', content: null }, { label: 'Configuration', content: null }, { label: 'Review', content: null }]}
    />
  ),
};
