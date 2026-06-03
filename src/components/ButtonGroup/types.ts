export type ButtonGroupLayout = 'Stacked' | 'Inline';
export type ButtonGroupState  = 'Default' | 'Inactive';

export interface ButtonGroupProps {
  layout?:     ButtonGroupLayout;
  state?:      ButtonGroupState;
  showLabel?:  boolean;
  showInfo?:   boolean;
  buttons?:    string[];
  label?:      string;
  onChange?:   (index: number) => void;
  labelWidth?: number;
  labelAlign?: 'left' | 'right';
}
