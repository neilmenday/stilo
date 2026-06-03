export type PopoverVariant =
  | 'Down centre' | 'Down left'    | 'Down right'
  | 'Up centre'   | 'Up left'      | 'Up right'
  | 'Right-Centre'| 'Right-Top'    | 'Right-Bottom'
  | 'Left-Centre' | 'Left-Top'     | 'Left-Bottom';

export interface InfoPopoverProps {
  title?:   string;
  body?:    string;
  variant?: PopoverVariant;
}
