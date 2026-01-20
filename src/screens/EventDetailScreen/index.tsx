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

  // 1. Get Store Data
  const { events, toggleInterest, interestedIds } = useEventStore();

  // 2. Find the specific event
  // We look it up in the store to ensure we have the latest data
  const event = useMemo(
    () => events.find(e => e.id === eventId),
    [events, eventId],
  );

  // 3. Derived State
  const isInterested = interestedIds.includes(eventId);

  // Handle "Event Not Found" edge case
  if (!event) {
    return (
      <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
        <InfoText>Event not found.</InfoText>
      </Container>
    );
  }

  // 4. Interaction Handler
  const handleToggle = () => {
    toggleInterest(eventId);
    // Optional: Visual feedback
    if (!isInterested) {
      // We assume simple alerts for now, can be replaced with Toasts
      Alert.alert('Saved!', 'Event added to your interested list.');
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

      {/* Sticky Bottom Button */}
      <BottomBar>
        <InterestButton
          onPress={handleToggle}
          isInterested={isInterested}
          activeOpacity={0.8}
        >
          <ButtonText isInterested={isInterested}>
            {isInterested ? '✓ Interested' : 'Mark as Interested'}
          </ButtonText>
        </InterestButton>
      </BottomBar>
    </Container>
  );
};
