import { useState, useCallback } from 'react';

export function useOverlayRegistryProvider() {
  const [openCount, setOpenCount] = useState(0);

  const register   = useCallback(() => setOpenCount(n => n + 1), []);
  const unregister = useCallback(() => setOpenCount(n => Math.max(0, n - 1)), []);

  return { openCount, register, unregister };
}
