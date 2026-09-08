import type React from 'react';
import type { PillVariant } from '../Pill/types';

export type GridCardIdentifierControl = 'none' | 'checkbox' | 'radio' | 'toggle';

export type GridCardSupportingInfo =
  | { variant: 'meta'; label?: string; pillLabel: string; pillVariant?: PillVariant }
  | { variant: 'content'; text: string };

export interface GridCardProps {
  identifier:          string;
  identifierControl?:  GridCardIdentifierControl;
  checked?:            boolean;
  onCheck?:            (checked: boolean) => void;
  radioGroupName?:     string;
  radioValue?:         string;
  showDotMenu?:        boolean;
  dotMenuItems?:       string[];
  onDotMenuSelect?:    (index: number, label: string) => void;
  supportingInfo?:     GridCardSupportingInfo;
  content?:            React.ReactNode;
  onCardClick?:        () => void;
  className?:          string;
}
