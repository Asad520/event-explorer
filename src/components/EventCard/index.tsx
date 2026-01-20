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
  RemoveButton,
  RemoveIcon,
} from './styles';

export const EventCard: FC<EventCardProps> = ({ event, onPress, onRemove }) => {
  return (
    <Card onPress={onPress} activeOpacity={0.7}>
      <Thumbnail source={{ uri: event.thumbnail }} />

      <Content>
        <DateText>{formatEventDate(event.date)}</DateText>
        <Title numberOfLines={2}>{event.name}</Title>
        <LocationText numberOfLines={1}>📍 {event.location}</LocationText>
      </Content>

      {/* Conditionally render the Remove Button if the prop exists */}
      {onRemove && (
        <RemoveButton
          onPress={onRemove}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <RemoveIcon>✕</RemoveIcon>
        </RemoveButton>
      )}
    </Card>
  );
};
