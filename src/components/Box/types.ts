import type React from 'react';

export interface BoxProps {
  title?:    string;
  pill?:     string;
  action?:   string;
  onAction?: () => void;
  children?: React.ReactNode;
}
