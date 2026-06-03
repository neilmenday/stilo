export interface PillColorPickerProps {
  label?:    string;
  value?:    string;
  onChange?: (hex: string) => void;
}

export const PILL_COLOR_PRESETS = [
  '#1DAA51',
  '#0D73E7',
  '#FF9C1C',
  '#6A2EE2',
  '#DB2B40',
  '#343E62',
];
