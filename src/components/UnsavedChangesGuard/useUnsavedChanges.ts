import { useState, useCallback } from 'react';

export interface UseUnsavedChangesReturn {
  isDirty: boolean;
  showWarning: boolean;
  markDirty: () => void;
  markClean: () => void;
  guardNavigation: (action: () => void) => void;
  confirmDiscard: () => void;
  dismissWarning: () => void;
}

export function useUnsavedChanges(): UseUnsavedChangesReturn {
  const [isDirty,       setIsDirty]       = useState(false);
  const [showWarning,   setShowWarning]   = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const markDirty = useCallback(() => { setIsDirty(true); }, []);

  const markClean = useCallback(() => {
    setIsDirty(false);
    setShowWarning(false);
    setPendingAction(null);
  }, []);

  const guardNavigation = useCallback((action: () => void) => {
    if (isDirty) {
      setPendingAction(() => action);
      setShowWarning(true);
    } else {
      action();
    }
  }, [isDirty]);

  const confirmDiscard = useCallback(() => {
    setIsDirty(false);
    setShowWarning(false);
    const action = pendingAction;
    setPendingAction(null);
    action?.();
  }, [pendingAction]);

  const dismissWarning = useCallback(() => {
    setShowWarning(false);
    setPendingAction(null);
  }, []);

  return { isDirty, showWarning, markDirty, markClean, guardNavigation, confirmDiscard, dismissWarning };
}
