export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/** Returns true when a single item with an onClick acts as a back link */
export function isSingleBackLink(items: BreadcrumbItem[]): boolean {
  return items.length === 1 && !!items[0].onClick;
}
