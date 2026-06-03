import type { ComboboxItem } from '../Combobox/types';

export interface MRFFieldOption extends ComboboxItem {
  subFields?: ComboboxItem[][];
}

export interface MRFRowData {
  id:                 string;
  resetKey:           number;
  fieldValue:         string | null;
  fieldLabel:         string | null;
  field2Value:        string | null;
  field2Label:        string | null;
  subFieldSelections: (ComboboxItem | null)[];
  conditionValue:     string | null;
  conditionLabel:     string | null;
  valueCombo:         string | null;
  valueComboLabel:    string | null;
  valueText:          string;
}

export interface MRFProps {
  variant?:         'default' | 'dual';
  contained?:       boolean;
  showLegend?:      boolean;
  fieldOptions:     MRFFieldOption[];
  field2Options?:   ComboboxItem[];
  conditionOptions:  ComboboxItem[];
  valueOptions:      ComboboxItem[];
  valueLayout?:      'combo-text' | 'text-only';
  maxRows?:          number;
  onChange?:         (rows: MRFRowData[]) => void;
}

export const MRF_STACK_BREAKPOINT = 560;
