import { useEffect, useMemo, useState, FC } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import { useTheme } from 'styled-components/native';

// Imports from our aliases
import { useEventStore } from '@src/store/useEventStore';
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

  // 1. Local State for Search
  const [searchText, setSearchText] = useState('');

  // 2. Global State from Zustand
  const { events, isLoading, error, fetchEvents } = useEventStore();

  // 3. Fetch on Mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // 4. Filtering Logic (Pure Logic)
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

  // 5. Handlers
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
        <RetryButton onPress={fetchEvents}>
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
        // Pull to Refresh
        refreshing={isLoading}
        onRefresh={fetchEvents}
        // Empty State (Search yielded no results)
        ListEmptyComponent={
          <EmptyText>No events found matching "{searchText}"</EmptyText>
        }
      />
    </Container>
  );
};
