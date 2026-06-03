import { useState } from 'react';

interface UseSettingsViewOptions {
  isDirty?: boolean;
  onNavChange?: (item: string) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export function useSettingsView({ isDirty = false, onNavChange, onSave, onCancel }: UseSettingsViewOptions = {}) {
  const [navWarning, setNavWarning] = useState(false);
  const [pendingNav, setPendingNav] = useState<string | null>(null);

  const handleNavClick = (item: string) => {
    if (isDirty) {
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
