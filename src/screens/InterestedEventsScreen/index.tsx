// src/screens/InterestedEventsScreen.tsx
import React, { useMemo } from 'react';
import { FlatList } from 'react-native';

// Imports
import { InterestedEventsProps } from '@src/navigation/types';
import { useEventStore } from '@src/store/useEventStore';
import { EventCard } from '@src/components';

import {
  Container,
  EmptyContainer,
  EmptyTitle,
  EmptySubtitle,
  ExploreButton,
  ButtonText,
} from './styles';

export const InterestedEventsScreen: React.FC<InterestedEventsProps> = ({
  navigation,
}) => {
  // 1. Get Global State (including toggleInterest)
  const { events, interestedIds, toggleInterest } = useEventStore();

  // 2. Filter Logic
  const interestedEvents = useMemo(() => {
    return events.filter(event => interestedIds.includes(event.id));
  }, [events, interestedIds]);

  // 3. Handlers
  const handlePressEvent = (eventId: string) => {
    navigation.navigate('EventDetail', { eventId });
  };

  const handleGoToExplore = () => {
    navigation.jumpTo('EventList');
  };

  // Logic to remove event
  const handleRemoveEvent = (eventId: string) => {
    toggleInterest(eventId); // Calling this on an existing ID removes it
  };

  if (interestedEvents.length === 0) {
    return (
      <EmptyContainer>
        <EmptyTitle>No saved events</EmptyTitle>
        <EmptySubtitle>
          You haven't marked any events as interested yet. Go explore!
        </EmptySubtitle>
        <ExploreButton onPress={handleGoToExplore}>
          <ButtonText>Explore Events</ButtonText>
        </ExploreButton>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      <FlatList
        data={interestedEvents}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => handlePressEvent(item.id)}
            // Pass the remove handler here
            onRemove={() => handleRemoveEvent(item.id)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};
