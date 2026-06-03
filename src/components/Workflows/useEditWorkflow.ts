import { useState, useEffect } from 'react';

interface UseEditWorkflowOptions {
  open: boolean;
  onSave?: () => void;
  onClose: () => void;
}

export function useEditWorkflow({ open, onSave, onClose }: UseEditWorkflowOptions) {
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (open) setIsDirty(false);
  }, [open]);

  const handleSave = () => {
    onSave?.();
    onClose();
  };

  return { isDirty, setIsDirty, handleSave };
}
