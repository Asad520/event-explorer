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

export type ApiResponse<T> = {
  data: T;
  status: number;
};
