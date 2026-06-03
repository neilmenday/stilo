import { useState } from 'react';

interface UseSettingsViewWithTabsOptions {
  isDirty?: boolean;
  onNavChange?: (item: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export function useSettingsViewWithTabs({ isDirty = false, onNavChange, onSave, onCancel }: UseSettingsViewWithTabsOptions = {}) {
  const [navWarning, setNavWarning] = useState(false);
  const [pendingNav, setPendingNav] = useState<string | null>(null);

  const handleNavClick = (item: string, isWorkflowManaged = false) => {
    if (isDirty && !isWorkflowManaged) {
      setPendingNav(item);
      setNavWarning(true);
    } else {
      onNavChange?.(item);
    }
  };

  const handleSave = () => {
    onSave?.();
    const nav = pendingNav;
    setPendingNav(null);
    setNavWarning(false);
    if (nav) onNavChange?.(nav);
  };

  const handleCancel = () => {
    onCancel?.();
    const nav = pendingNav;
    setPendingNav(null);
    setNavWarning(false);
    if (nav) onNavChange?.(nav);
  };

  return { navWarning, handleNavClick, handleSave, handleCancel };
}
