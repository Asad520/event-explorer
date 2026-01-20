import { FC } from 'react';

import { formatEventDate } from '@src/utils/date';

import { EventCardProps } from './types';
import {
  Card,
  Thumbnail,
  Content,
  Title,
  DateText,
  LocationText,
} from './styles';

export const EventCard: FC<EventCardProps> = ({ event, onPress }) => {
  return (
    <Card onPress={onPress} activeOpacity={0.7}>
      <Thumbnail source={{ uri: event.thumbnail }} />

      <Content>
        <DateText>{formatEventDate(event.date)}</DateText>
        <Title numberOfLines={2}>{event.name}</Title>
        <LocationText numberOfLines={1}>📍 {event.location}</LocationText>
      </Content>
    </Card>
  );
};
