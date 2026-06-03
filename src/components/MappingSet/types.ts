export interface MappingSetColumnDef {
  key:          string;
  title:        string;
  type:         'combobox' | 'text';
  placeholder?: string;
  items?:       { value: string; label: string }[];
  width?:       number;
}

export interface MappingSetRowData {
  id:       string;
  resetKey: number;
  values:   Record<string, string>;
  labels:   Record<string, string>;
  matched:  boolean;
}

export interface MappingSetProps {
  columns:     MappingSetColumnDef[];
  showMatch?:  boolean;
  matchLabel?: string;
  addLabel?:   string;
  maxRows?:    number;
  onChange?:   (rows: MappingSetRowData[]) => void;
}
