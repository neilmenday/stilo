import { useState, useEffect } from 'react';

interface UseWorkflowSteppedOptions {
  open: boolean;
  totalSteps: number;
  activeStep?: number;
  onStepChange?: (step: number) => void;
}

export function useWorkflowStepped({ open, totalSteps, activeStep, onStepChange }: UseWorkflowSteppedOptions) {
  const [internalStep, setInternalStep] = useState(1);

  useEffect(() => {
    if (open) setInternalStep(1);
  }, [open]);

  const isControlled   = activeStep !== undefined;
  const resolvedStep   = isControlled ? activeStep! : internalStep;

  const setStep = (n: number) => {
    if (!isControlled) setInternalStep(n);
    onStepChange?.(n);
  };

  const isFirst = resolvedStep === 1;
  const isLast  = resolvedStep === totalSteps;

  const handleBack  = () => setStep(resolvedStep - 1);
  const handleNext  = () => setStep(resolvedStep + 1);

  return { resolvedStep, isFirst, isLast, handleBack, handleNext, setStep };
}
