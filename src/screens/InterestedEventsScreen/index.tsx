// src/screens/InterestedEventsScreen.tsx
import React, { useMemo, useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';

// Imports
import { InterestedEventsProps } from '@src/navigation/types';
import { useEventStore } from '@src/store/useEventStore';
import { EventCard } from '@src/components';
import { Event } from '@src/api/types';

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

  // 2. Filter Logic - memoized
  const interestedEvents = useMemo(() => {
    return events.filter(event => interestedIds.includes(event.id));
  }, [events, interestedIds]);

  // 3. Handlers - all memoized with useCallback
  const handlePressEvent = useCallback(
    (eventId: string) => {
      navigation.navigate('EventDetail', { eventId });
    },
    [navigation],
  );

  const handleGoToExplore = useCallback(() => {
    navigation.jumpTo('EventList');
  }, [navigation]);

  // Logic to remove event - memoized
  const handleRemoveEvent = useCallback(
    (eventId: string) => {
      toggleInterest(eventId); // Calling this on an existing ID removes it
    },
    [toggleInterest],
  );

  // FlatList optimization: memoized renderItem
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Event>) => (
      <EventCard
        event={item}
        onPress={() => handlePressEvent(item.id)}
        onRemove={() => handleRemoveEvent(item.id)}
      />
    ),
    [handlePressEvent, handleRemoveEvent],
  );

  // FlatList optimization: memoized keyExtractor
  const keyExtractor = useCallback((item: Event) => item.id, []);

  // FlatList optimization: memoized content container style
  const contentContainerStyle = useMemo(() => ({ paddingBottom: 20 }), []);

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
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={contentContainerStyle}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={5}
      />
    </Container>
  );
};
