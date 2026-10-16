import type { ViewMode } from '../ActionsSet/types';

/** What a ViewOptionsProvider gives the sets in it: each table's remembered view
 *  (Table / List), by key. The app decides where it's stored. */
export interface ViewOptionsContextValue {
  getViewMode: (key: string) => ViewMode | undefined;
  setViewMode: (key: string, mode: ViewMode) => void;
}
