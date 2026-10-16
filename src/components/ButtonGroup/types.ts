export type ButtonGroupLayout = 'Stacked' | 'Inline';
export type ButtonGroupState  = 'Default' | 'Inactive';

export interface ButtonGroupProps {
  layout?:     ButtonGroupLayout;
  state?:      ButtonGroupState;
  showLabel?:  boolean;
  showInfo?:   boolean;
  buttons?:    string[];
  /** Icon-only: an icon (registry name) per button; the buttons' labels become their accessible names. */
  icons?:      string[];
  /** The active button, when the consumer owns it (otherwise the group keeps its own, starting at 0). */
  activeIndex?: number;
  label?:      string;
  onChange?:   (index: number) => void;
  labelWidth?: number;
  labelAlign?: 'left' | 'right';
}
