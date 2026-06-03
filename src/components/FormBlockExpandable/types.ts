import type React from 'react';
import type { ExpandableBoxVariant } from '../ExpandableBox/types';

export interface FormBlockExpandableProps {
  title?: string;
  variant?: ExpandableBoxVariant;
  defaultOpen?: boolean;
  showPill?: boolean;
  pillLabel?: string;
  showDotmenu?: boolean;
  children?: React.ReactNode;
  onChange?: (value: boolean) => void;
}
