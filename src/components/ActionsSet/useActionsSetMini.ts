import { useLayoutEffect, useRef, useState } from 'react';

// Switches an ActionsSet into mini mode when its full-size controls don't fit
// its width, and back once there's room again. The full-size width is measured
// when it overflows, so there's no fixed breakpoint.
export function useActionsSetMini<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [mini, setMini] = useState(false);
  const fullWidth = useRef(0);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const check = () => {
      if (!mini && el.scrollWidth > el.clientWidth) {
        fullWidth.current = el.scrollWidth;
        setMini(true);
      } else if (mini && el.clientWidth >= fullWidth.current) {
        setMini(false);
      }
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [mini]);

  return { ref, mini };
}
