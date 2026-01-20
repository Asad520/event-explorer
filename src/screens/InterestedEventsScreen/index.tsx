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
  // 1. Get Global State
  const { events, interestedIds } = useEventStore();

  // 2. Filter Logic (Derived State)
  // Only show events whose ID is in the interestedIds array
  const interestedEvents = useMemo(() => {
    return events.filter(event => interestedIds.includes(event.id));
  }, [events, interestedIds]);

  // 3. Navigation Handler
  const handlePressEvent = (eventId: string) => {
    navigation.navigate('EventDetail', { eventId });
  };

  const handleGoToExplore = () => {
    navigation.jumpTo('EventList'); // jumpTo is specific to Tab navigation
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
          <EventCard event={item} onPress={() => handlePressEvent(item.id)} />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </Container>
  );
};
