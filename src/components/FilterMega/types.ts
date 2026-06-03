import type React from 'react';

export interface FilterField {
  key: string;
  label: string;
  type: 'combobox' | 'date';
  items?: { value: string; label: string }[];
  showInfo?: boolean;
  infoTitle?: string;
  infoBody?: string;
}

export interface FilterMegaProps {
  label?: string;
  showInfo?: boolean;
  infoTitle?: string;
  infoBody?: string;
  placeholder?: string;
  fields?: FilterField[];
  panelWidth?: number;
  values?: Record<string, string>;
  renderResponse?: (values: Record<string, string>) => React.ReactNode;
  onChange?: (values: Record<string, string>) => void;
}
