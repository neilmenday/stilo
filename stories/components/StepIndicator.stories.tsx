import type { Meta, StoryObj } from '@storybook/react';
import type { StepIndicatorProps } from '../../src/components/StepIndicator';
import { getStepState } from '../../src/components/StepIndicator';

function StepIndicatorDemo({
  steps = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }],
  activeStep = 2,
  showLabel = true,
  stepWidth = 120,
}: StepIndicatorProps) {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'flex-start' }}>
      {steps.map((step, i) => {
        const stepNum = i + 1;
        const state = getStepState(stepNum, activeStep);
        const isComplete = state === 'complete';
        const isCurrent = state === 'current';

        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              {i > 0 && (
                <div style={{ flex: 1, height: 2, background: isComplete ? '#111' : '#e0e0e0', marginTop: -1 }} />
              )}
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: isCurrent ? '#111' : isComplete ? '#111' : '#e0e0e0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, color: isCurrent || isComplete ? '#fff' : '#555',
                border: isCurrent ? '2px solid #111' : 'none',
              }}>
                {isComplete ? '✓' : stepNum}
              </div>
              {i < steps.length - 1 && (
                <div style={{ flex: 1, height: 2, background: isComplete ? '#111' : '#e0e0e0', marginTop: -1 }} />
              )}
            </div>
            {showLabel && (
              <div style={{ fontSize: 11, color: isCurrent ? '#111' : '#555', marginTop: 6, textAlign: 'center', fontWeight: isCurrent ? 600 : 400 }}>
                {step.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const meta: Meta<typeof StepIndicatorDemo> = {
  title: 'Stilo/Components - Passive/StepIndicator',
  component: StepIndicatorDemo,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof StepIndicatorDemo>;

export const Default: Story = {
  args: {
    steps: [{ label: 'Details' }, { label: 'Configuration' }, { label: 'Review' }, { label: 'Done' }],
    activeStep: 2,
    showLabel: true,
  },
};
