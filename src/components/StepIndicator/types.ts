export type StepState = 'complete' | 'current' | 'next';

export interface Step {
  label: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  activeStep?: number;
  showLabel?: boolean;
  stepWidth?: number;
}

export function getStepState(stepNumber: number, activeStep: number): StepState {
  if (stepNumber < activeStep)  return 'complete';
  if (stepNumber === activeStep) return 'current';
  return 'next';
}
