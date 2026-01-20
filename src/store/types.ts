import { Event } from '@src/api/types';

export type EventState = {
  // State
  events: Event[];
  interestedIds: string[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchEvents: () => Promise<void>;
  toggleInterest: (eventId: string) => void;
  // Selector Helper (optional but useful)
  isInterested: (eventId: string) => boolean;
};
