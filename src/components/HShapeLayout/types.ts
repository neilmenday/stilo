import type React from 'react';

export interface HShapeLayoutProps {
  sidebar?:      React.ReactNode;
  sidebarProps?: Record<string, unknown>;
  headerBlock?:  React.ReactNode;
  col1:          React.ReactNode;
  col1Width?:    number;
  col2?:         React.ReactNode;
  col3?:         React.ReactNode;
  col3Width?:    number;
}
