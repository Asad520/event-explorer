import { useMemo, FC } from 'react';
import { StatusBar, Alert } from 'react-native';

import { formatEventDate } from '@src/utils/date';
import { EventDetailProps } from '@src/navigation/types';
import { useEventStore } from '@src/store/useEventStore';

import {
  Container,
  ScrollContainer,
  HeroImage,
  Content,
  DateText,
  Title,
  SectionLabel,
  InfoText,
  BottomBar,
  InterestButton,
  ButtonText,
} from './styles';

export const EventDetailScreen: FC<EventDetailProps> = ({ route }) => {
  const { eventId } = route.params;

  const { events, savedEvents, toggleInterest, isInterested } = useEventStore();

  const event = useMemo(
    () =>
      events.find(e => e.id === eventId) ||
      savedEvents.find(e => e.id === eventId),
    [events, savedEvents, eventId],
  );

  const isInterestedEvent = isInterested(eventId);

  // Handle "Event Not Found" edge case
  if (!event) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <InfoText>Event not found.</InfoText>
      </Container>
    );
  }

  const handleToggle = () => {
    if (event) {
      toggleInterest(event);

      if (!isInterestedEvent) {
        Alert.alert('Saved!', 'Event added to your interested list.');
      }
    }
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" />

      <ScrollContainer>
        <HeroImage source={{ uri: event.image }} resizeMode="cover" />

        <Content>
          <DateText>{formatEventDate(event.date)}</DateText>
          <Title>{event.name}</Title>

          <SectionLabel>📍 Location</SectionLabel>
          <InfoText>{event.location}</InfoText>

          <SectionLabel>👤 Organizer</SectionLabel>
          <InfoText>{event.organizer}</InfoText>

          <SectionLabel>📝 About</SectionLabel>
          <InfoText>{event.description}</InfoText>
        </Content>
      </ScrollContainer>

      <BottomBar>
        <InterestButton
          onPress={handleToggle}
          isInterested={isInterestedEvent}
          activeOpacity={0.8}
        >
          <ButtonText isInterested={isInterestedEvent}>
            {isInterestedEvent ? '✓ Interested' : 'Mark as Interested'}
          </ButtonText>
        </InterestButton>
      </BottomBar>
    </Container>
  );
};
