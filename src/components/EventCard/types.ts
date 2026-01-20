import { Event } from '@src/api/types';

export type EventCardProps = {
  event: Event;
  onPress: () => void;
  onRemove?: () => void;
};
