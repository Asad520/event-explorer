import { useEffect, useMemo, useState, FC } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import { useTheme } from 'styled-components/native';

// Imports from our aliases
import { mmkvStorage, useEventStore } from '@src/store/useEventStore';
import { EventListProps } from '@src/navigation/types';
import { SearchBar, EventCard } from '@src/components';
import { Event } from '@src/api/types';

import {
  Container,
  CenterContainer,
  ErrorText,
  RetryButton,
  RetryText,
  EmptyText,
} from './styles';

export const EventListScreen: FC<EventListProps> = ({ navigation }) => {
  const theme = useTheme();

  const [searchText, setSearchText] = useState('');

  const { events, isLoading, error, fetchEvents, hasMore } = useEventStore();

  useEffect(() => {
    // Only fetch if empty to avoid double fetch on re-mount
    if (events.length === 0) {
      fetchEvents(true); // true = refresh (page 1)
    }
  }, []);

  // We use useMemo so we don't re-filter on every tiny re-render, only when data changes
  const filteredEvents = useMemo(() => {
    if (!searchText) return events;

    const lowerText = searchText.toLowerCase();
    return events.filter(
      event =>
        event.name.toLowerCase().includes(lowerText) ||
        event.location.toLowerCase().includes(lowerText),
    );
  }, [events, searchText]);

  const handleRefresh = () => {
    fetchEvents(true);
  };

  const handleLoadMore = () => {
    // Only load more if we are NOT searching (local filtering breaks pagination logic)
    if (!searchText && hasMore && !isLoading) {
      fetchEvents(false); // false = load next page
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;
    return (
      <CenterContainer style={{ paddingVertical: 20 }}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </CenterContainer>
    );
  };

  const handlePressEvent = (eventId: string) => {
    // Navigate to the Details stack
    navigation.navigate('EventDetail', { eventId });
  };

  // --- RENDERS ---

  // Render Item for FlatList
  const renderItem = ({ item }: { item: Event }) => (
    <EventCard event={item} onPress={() => handlePressEvent(item.id)} />
  );

  // Loading State
  // Only show full-screen loader if we have NO data.
  // If we have data (offline mode), show it even if "loading" is true.
  if (isLoading && events.length === 0) {
    return (
      <CenterContainer>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={{ marginTop: 10, color: theme.colors.textSecondary }}>
          Finding events...
        </Text>
      </CenterContainer>
    );
  }

  // Error State (only if no data is visible)
  if (error && events.length === 0) {
    return (
      <CenterContainer>
        <ErrorText>Oops! Something went wrong.</ErrorText>
        <ErrorText>{error}</ErrorText>
        <RetryButton onPress={handleRefresh}>
          <RetryText>Try Again</RetryText>
        </RetryButton>
      </CenterContainer>
    );
  }

  return (
    <Container>
      {/* Search Bar Header */}
      <SearchBar value={searchText} onChangeText={setSearchText} />

      {/* Main List */}
      <FlatList
        data={filteredEvents}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        // Refreshing Logic
        refreshing={isLoading && events.length === 0} // Only show top spinner on full reload
        onRefresh={handleRefresh}
        // Pagination Logic
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5} // Trigger when 50% from bottom
        ListFooterComponent={renderFooter} // Show spinner at bottom while appending
        ListEmptyComponent={
          !isLoading ? (
            <EmptyText>No events found matching "{searchText}"</EmptyText>
          ) : null
        }
      />
    </Container>
  );
};
