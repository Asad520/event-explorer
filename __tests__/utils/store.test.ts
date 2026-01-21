// Tests for the zustand store using a mocked MMKV storage and mocked API

import { STORE_KEYS } from '@src/utils/constants';

const mockSet = jest.fn();
const mockGetString = jest.fn();
const mockRemove = jest.fn();
const mockGetEvents = jest.fn();

jest.mock('react-native-mmkv', () => ({
  createMMKV: () => ({
    set: mockSet,
    getString: mockGetString,
    remove: mockRemove,
  }),
}));

// The store imports `@src/api/client` so mock that module. Tests will configure
// `mockGetEvents` per-case.
jest.mock('@src/api/client', () => ({
  getEvents: mockGetEvents,
}));

describe('useEventStore (zustand + MMKV)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default: no persisted data
    mockGetString.mockReturnValue(null);
    // Reset module cache so the store is re-created with current mock behavior
    jest.resetModules();
  });

  test('initial state when storage empty', () => {
    const { useEventStore } = require('@src/store/useEventStore');

    const state = useEventStore.getState();
    expect(state.events).toEqual([]);
    expect(state.savedEvents).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('fetchEvents success stores events and persists to MMKV', async () => {
    const sample = [{ id: '1', name: 'Event 1', location: 'Location 1' }];
    // The store expects getEvents to return an object: { data, next }
    mockGetEvents.mockResolvedValue({ data: sample, next: null });

    const { useEventStore } = require('@src/store/useEventStore');

    await useEventStore.getState().fetchEvents();

    const state = useEventStore.getState();
    expect(state.events).toEqual(sample);
    expect(state.isLoading).toBe(false);
    // Persist should call MMKV.set at least once with the storage key
    expect(mockSet).toHaveBeenCalled();
    const calledWithKey = mockSet.mock.calls.some(
      call => call[0] === STORE_KEYS.EVENT_STORE,
    );
    expect(calledWithKey).toBe(true);
  });

  test('fetchEvents error keeps previous events and sets error', async () => {
    mockGetEvents.mockRejectedValue(new Error('Network down'));

    const { useEventStore } = require('@src/store/useEventStore');

    await useEventStore.getState().fetchEvents();

    const state = useEventStore.getState();
    expect(state.events).toEqual([]); // unchanged
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Network down');
  });

  test('toggleInterest and isInterested behave correctly and persist', () => {
    const { useEventStore } = require('@src/store/useEventStore');

    const { toggleInterest, isInterested } = useEventStore.getState();
    const sampleEvent = {
      id: 'a',
      name: 'Test Event',
      location: 'Test Location',
    };

    expect(isInterested('a')).toBe(false);
    toggleInterest(sampleEvent);
    expect(useEventStore.getState().savedEvents).toContainEqual(sampleEvent);
    expect(isInterested('a')).toBe(true);

    toggleInterest(sampleEvent);
    expect(isInterested('a')).toBe(false);
    expect(useEventStore.getState().savedEvents).toEqual([]);

    // Ensure persistence was attempted
    expect(mockSet).toHaveBeenCalled();
  });

  test('toggleInterest handles multiple events correctly', () => {
    const { useEventStore } = require('@src/store/useEventStore');

    const { toggleInterest, isInterested } = useEventStore.getState();
    const event1 = { id: '1', name: 'Event 1', location: 'Location 1' };
    const event2 = { id: '2', name: 'Event 2', location: 'Location 2' };

    // Add both events
    toggleInterest(event1);
    toggleInterest(event2);

    const state = useEventStore.getState();
    expect(state.savedEvents).toHaveLength(2);
    expect(isInterested('1')).toBe(true);
    expect(isInterested('2')).toBe(true);

    // Remove first event, second should remain
    toggleInterest(event1);
    expect(isInterested('1')).toBe(false);
    expect(isInterested('2')).toBe(true);
    expect(useEventStore.getState().savedEvents).toHaveLength(1);
    expect(useEventStore.getState().savedEvents[0]).toEqual(event2);
  });

  test('rehydrates state from MMKV getString', () => {
    const storedEvent = {
      id: 'x',
      name: 'Stored Event',
      location: 'Test Location',
    };
    const stored = JSON.stringify({
      state: {
        events: [storedEvent],
        savedEvents: [storedEvent],
        isLoading: false,
        error: null,
      },
    });

    mockGetString.mockReturnValue(stored);
    jest.resetModules();
    const { useEventStore } = require('@src/store/useEventStore');

    const state = useEventStore.getState();
    expect(state.events).toEqual([storedEvent]);
    expect(state.savedEvents).toEqual([storedEvent]);
  });
});
