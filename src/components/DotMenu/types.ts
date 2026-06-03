export interface DotMenuProps {
  items: string[];
  onSelect?: (index: number, label: string) => void;
  align?: 'left' | 'right';
  iconColor?: string;
  maxVisible?: number;
}
