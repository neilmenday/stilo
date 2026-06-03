import { useState } from 'react';

interface UseMiscViewOptions {
  activeTabIdProp?: string;
  defaultTabId?: string;
  onTabChange?: (id: string) => void;
}

export function useMiscView({ activeTabIdProp, defaultTabId = '', onTabChange }: UseMiscViewOptions = {}) {
  const [internalTabId, setInternalTabId] = useState<string>(
    () => activeTabIdProp ?? defaultTabId
  );

  const isControlled = activeTabIdProp !== undefined;
  const activeTabId  = isControlled ? activeTabIdProp! : internalTabId;

  const handleTabChange = (id: string) => {
    if (!isControlled) setInternalTabId(id);
    onTabChange?.(id);
  };

  return { activeTabId, handleTabChange };
}
