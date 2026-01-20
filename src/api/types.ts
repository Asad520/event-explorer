export type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  thumbnail: string;
  image: string;
  description: string;
  organizer: string;
};

export type PaginatedResult<T> = {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: T[];
};

// Specific type alias for your API calls
export type EventsResponse = PaginatedResult<Event>;
