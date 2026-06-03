export interface CodeRowColor {
  line:  number;
  color: string;
}

export interface CodeTextareaProps {
  value?:       string;
  onChange?:    (value: string) => void;
  placeholder?: string;
  rows?:        number;
  disabled?:    boolean;
  readOnly?:    boolean;
  rowColors?:   CodeRowColor[];
  showCopy?:    boolean;
  width?:       number | string;
}

export const CODE_LINE_H = 20;
export const CODE_PAD_V  = 12;
export const CODE_PAD_H  = 12;
