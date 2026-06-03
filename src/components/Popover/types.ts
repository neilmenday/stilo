export type PopoverVariant =
  | 'Down centre' | 'Down left'    | 'Down right'
  | 'Up centre'   | 'Up left'      | 'Up right'
  | 'Right-Centre'| 'Right-Top'    | 'Right-Bottom'
  | 'Left-Centre' | 'Left-Top'     | 'Left-Bottom';

export interface PopoverProps {
  property1?: PopoverVariant;
  title?:     string;
  body?:      string;
  closable?:  boolean;
  onClose?:   () => void;
}

type CaretDirection = 'down' | 'up' | 'left' | 'right';
type CaretAlignment = 'left' | 'centre' | 'right' | 'top' | 'bottom';

export function parsePopoverVariant(v: PopoverVariant): { dir: CaretDirection; align: CaretAlignment } {
  if (v.startsWith('Down'))  return { dir: 'down',  align: v.replace('Down ', '').toLowerCase() as CaretAlignment };
  if (v.startsWith('Up'))    return { dir: 'up',    align: v.replace('Up ', '').toLowerCase() as CaretAlignment };
  if (v.startsWith('Right')) return { dir: 'right', align: v.replace('Right-', '').toLowerCase() as CaretAlignment };
  if (v.startsWith('Left'))  return { dir: 'left',  align: v.replace('Left-', '').toLowerCase() as CaretAlignment };
  return { dir: 'down', align: 'centre' };
}
