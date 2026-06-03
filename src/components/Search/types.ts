export type SearchVariant = 'Default' | 'Searched' | 'Category';

export interface SearchProps {
  variant?:   SearchVariant;
  showLabel?: boolean;
  label?:     string;
  onChange?:  (value: string) => void;
}
