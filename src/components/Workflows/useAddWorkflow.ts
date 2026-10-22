import { useState, useEffect, useLayoutEffect, useRef } from 'react';

interface UseAddWorkflowOptions {
  open: boolean;
  leftContent?: unknown;
  leftComplete?: boolean;
  rightGuidance?: { title: string; body: string };
}

export function useAddWorkflow({ open, leftContent, leftComplete, rightGuidance }: UseAddWorkflowOptions) {
  const resolvedLeftComplete = leftContent ? (leftComplete ?? false) : true;

  const [showGuide,      setShowGuide]      = useState(true);
  const [showRightGuide, setShowRightGuide] = useState(false);

  useEffect(() => {
    if (resolvedLeftComplete && rightGuidance) setShowRightGuide(true);
  }, [resolvedLeftComplete, rightGuidance]);

  useEffect(() => {
    if (open) { setShowGuide(true); setShowRightGuide(false); }
  }, [open]);

  // Stacked: the left column sits above the right one when the right column's
  // content (at its natural width) doesn't fit beside it, and goes back beside
  // it once there's room again - as ActionsSet goes mini (no fixed breakpoint).
  // bodyRef goes on the two-column body, rightRef on the right column; the
  // component keeps the right column's content at its natural width while
  // side by side, so an overflow means it doesn't fit. Callback refs: the
  // overlay puts its body on the page after it opens, so the check starts
  // when the columns appear.
  const [body,  bodyRef]  = useState<HTMLDivElement | null>(null);
  const [right, rightRef] = useState<HTMLDivElement | null>(null);
  const [stacked, setStacked] = useState(false);
  const fullWidth = useRef(0);
  const hasLeft = !!leftContent;

  useLayoutEffect(() => {
    if (!open || !hasLeft || !body || !right || typeof ResizeObserver === 'undefined') return;
    const check = () => {
      if (!stacked && right.scrollWidth > right.clientWidth) {
        fullWidth.current = body.clientWidth + (right.scrollWidth - right.clientWidth);
        setStacked(true);
      } else if (stacked && body.clientWidth >= fullWidth.current) {
        setStacked(false);
      }
    };
    check();
    const observer = new ResizeObserver(check);
    observer.observe(body);
    return () => observer.disconnect();
  }, [open, hasLeft, stacked, body, right]);

  return { resolvedLeftComplete, showGuide, setShowGuide, showRightGuide, setShowRightGuide, bodyRef, rightRef, stacked };
}
