import { useState, useCallback } from 'react';

/** Used by SettingsViewWithTabs — provides the context value */
export function useWorkflowManagedProvider() {
  const [count, setCount] = useState(0);
  const register   = useCallback(() => setCount(n => n + 1), []);
  const unregister = useCallback(() => setCount(n => Math.max(0, n - 1)), []);
  return { register, unregister, isWorkflowManaged: count > 0 };
}
