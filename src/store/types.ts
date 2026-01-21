import { Event } from '@src/api/types';

export type EventState = {
  events: Event[];
  savedEvents: Event[];
  isLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;

  fetchEvents: (refresh?: boolean) => Promise<void>;
  toggleInterest: (event: Event) => void;
  isInterested: (eventId: string) => boolean;
};

export type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};
