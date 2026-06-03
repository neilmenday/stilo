import { useState, useEffect } from 'react';

interface UseTableSetOptions {
  onPanelSave?: (row: unknown) => void;
}

export function useTableSet({ onPanelSave }: UseTableSetOptions = {}) {
  const [selectedRow, setSelectedRow] = useState<unknown>(null);
  const [isDirty,     setIsDirty]     = useState(false);

  useEffect(() => { setIsDirty(false); }, [selectedRow]);

  const onClose    = () => setSelectedRow(null);
  const handleSave = () => { onPanelSave?.(selectedRow); onClose(); };

  return { selectedRow, setSelectedRow, isDirty, setIsDirty, onClose, handleSave };
}
