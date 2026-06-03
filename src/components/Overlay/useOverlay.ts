import { useState, useEffect } from 'react';

interface UseOverlayOptions {
  open: boolean;
}

export function useOverlay({ open }: UseOverlayOptions) {
  const [contentVisible, setContentVisible] = useState(open);

  useEffect(() => {
    if (open) setContentVisible(true);
  }, [open]);

  return { contentVisible, setContentVisible };
}
