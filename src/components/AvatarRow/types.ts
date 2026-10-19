/** A person in an AvatarRow: their photo, or initials when there's no photo. */
export interface AvatarRowPerson {
  name?:     string;
  src?:      string;
  initials?: string;
}

/** A row of avatars on a pill-shaped background, the first `max` people shown
 *  and the rest summed up as "+N more". */
export interface AvatarRowProps {
  people:       AvatarRowPerson[];
  /** How many avatars to show before "+N more" (default 5). */
  max?:         number;
  /** Makes "+N more" a link (e.g. to see everyone). */
  onMoreClick?: () => void;
}
