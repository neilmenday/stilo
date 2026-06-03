import { useState, useEffect } from 'react';

interface UseAddWorkflowOptions {
  open: boolean;
  leftContent?: unknown;
  leftComplete?: boolean;
  rightGuidance?: { title: string; body: string };
}

export function useAddWorkflow({ open, leftContent, leftComplete, rightGuidance }: UseAddWorkflowOptions) {
  const resolvedLeftComplete = leftContent ? (leftComplete ?? false) : true;

  const [showGuide,      setShowGuide]      = useState(true);
  const [showRightGuide, setShowRightGuide] = useState(false);

  useEffect(() => {
    if (resolvedLeftComplete && rightGuidance) setShowRightGuide(true);
  }, [resolvedLeftComplete, rightGuidance]);

  useEffect(() => {
    if (open) { setShowGuide(true); setShowRightGuide(false); }
  }, [open]);

  return { resolvedLeftComplete, showGuide, setShowGuide, showRightGuide, setShowRightGuide };
}
