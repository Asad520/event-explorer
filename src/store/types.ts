import { Event } from '@src/api/types';

export type EventState = {
  events: Event[];
  interestedIds: string[];
  isLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;

  fetchEvents: (refresh?: boolean) => Promise<void>;
  toggleInterest: (eventId: string) => void;
  isInterested: (eventId: string) => boolean;
};

export type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};
