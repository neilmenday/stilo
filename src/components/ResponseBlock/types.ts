/** A short line of feedback text nested under (stacked) or beside (inline) a field. */
export type ResponseBlockVariant = 'default' | 'warning' | 'error';

export interface ResponseBlockProps {
  message:  string;
  variant?: ResponseBlockVariant;
}
