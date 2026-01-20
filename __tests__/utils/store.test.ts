// Tests for the zustand store using a mocked MMKV storage and mocked API

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
    expect(state.interestedIds).toEqual([]);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('fetchEvents success stores events and persists to MMKV', async () => {
    const sample = [{ id: '1', title: 'Event 1' }];
    mockGetEvents.mockResolvedValue(sample);

    const { useEventStore } = require('@src/store/useEventStore');

    await useEventStore.getState().fetchEvents();

    const state = useEventStore.getState();
    expect(state.events).toEqual(sample);
    expect(state.isLoading).toBe(false);
    // Persist should call MMKV.set at least once with the storage key
    expect(mockSet).toHaveBeenCalled();
    const calledWithKey = mockSet.mock.calls.some(
      call => call[0] === 'event-explorer-storage',
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

    expect(isInterested('a')).toBe(false);
    toggleInterest('a');
    expect(useEventStore.getState().interestedIds).toContain('a');
    expect(isInterested('a')).toBe(true);

    toggleInterest('a');
    expect(isInterested('a')).toBe(false);

    // Ensure persistence was attempted
    expect(mockSet).toHaveBeenCalled();
  });

  test('rehydrates state from MMKV getString', () => {
    const stored = JSON.stringify({
      state: {
        events: [{ id: 'x', title: 'Stored Event' }],
        interestedIds: ['x'],
        isLoading: false,
        error: null,
      },
    });

    mockGetString.mockReturnValue(stored);
    jest.resetModules();
    const { useEventStore } = require('@src/store/useEventStore');

    const state = useEventStore.getState();
    expect(state.events).toEqual([{ id: 'x', title: 'Stored Event' }]);
    expect(state.interestedIds).toEqual(['x']);
  });
});
