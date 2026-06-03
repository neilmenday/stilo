export type ChartVariant = 'line' | 'bar' | 'pie' | 'area' | 'treemap' | 'scatter';

export interface SeriesPoint { x: number; y: number; }

export interface Series {
  label: string;
  data: number[] | SeriesPoint[];
}

export interface DataVizProps {
  variant?: ChartVariant;
  title?: string;
  subtitle?: string;
  labels?: string[];
  series?: Series[];
  height?: number;
}
