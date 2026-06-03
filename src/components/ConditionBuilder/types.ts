import type React from 'react';
import type { ComboboxItem } from '../Combobox/types';

export interface ConditionBuilderRowData {
  id:               string;
  resetKey:         number;
  fieldValue:       string | null;
  fieldLabel:       string | null;
  conditionValue:   string | null;
  conditionLabel:   string | null;
  valueCombo:       string | null;
  valueComboLabel:  string | null;
  valueText:        string;
  logic:            'AND' | 'OR';
}

export interface ConditionBuilderProps {
  contained?:       boolean;
  showLegend?:      boolean;
  fieldOptions:     ComboboxItem[];
  conditionOptions: ComboboxItem[];
  renderValue?:     (row: ConditionBuilderRowData) => React.ReactNode;
  valueLayout?:     'combo-text' | 'text-only';
  valueOptions?:    ComboboxItem[];
  maxRows?:         number;
  initialRows?:     Partial<ConditionBuilderRowData>[];
  onChange?:        (rows: ConditionBuilderRowData[]) => void;
}
