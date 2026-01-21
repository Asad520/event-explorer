import { FC, useCallback, useMemo } from 'react';
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

export const InterestedEventsScreen: FC<InterestedEventsProps> = ({
  navigation,
}) => {
  // 1. Get Global State
  // We now pull `savedEvents` directly. No filtering needed!
  const { savedEvents, toggleInterest } = useEventStore();

  // 2. Handlers
  const handlePressEvent = useCallback(
    (eventId: string) => {
      navigation.navigate('EventDetail', { eventId });
    },
    [navigation],
  );

  const handleGoToExplore = useCallback(() => {
    navigation.jumpTo('EventList');
  }, [navigation]);

  const handleRemoveEvent = useCallback(
    (event: Event) => {
      toggleInterest(event);
    },
    [toggleInterest],
  );

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Event>) => (
      <EventCard
        event={item}
        onPress={() => handlePressEvent(item.id)}
        onRemove={() => handleRemoveEvent(item)}
      />
    ),
    [handlePressEvent, handleRemoveEvent],
  );

  const keyExtractor = useCallback((item: Event) => item.id, []);

  const contentContainerStyle = useMemo(() => ({ paddingBottom: 20 }), []);

  // 4. Empty State
  if (savedEvents.length === 0) {
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

  // 5. Main Render
  return (
    <Container>
      <FlatList
        data={savedEvents} // Use the store array directly
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
