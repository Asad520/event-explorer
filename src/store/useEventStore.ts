import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';

import { getEvents } from '@src/api/client';

import { EventState } from './types';

// 1. INITIALIZE MMKV
const storage = createMMKV();

// 2. CREATE ZUSTAND STORAGE ADAPTER
// MMKV is synchronous, which is faster and easier than AsyncStorage
export const mmkvStorage: StateStorage = {
  setItem: (name, value) => storage.set(name, value),
  getItem: name => storage.getString(name) ?? null,
  removeItem: name => storage.remove(name),
};

// 3. CREATE THE STORE
export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      events: [],
      interestedIds: [],
      isLoading: false,
      error: null,
      page: 1,
      hasMore: true,

      fetchEvents: async (refresh = false) => {
        const { page, events, hasMore, isLoading } = get();

        // Prevent fetching if already loading or no more data (unless refreshing)
        if (isLoading || (!hasMore && !refresh)) return;

        set({ isLoading: true, error: null });

        try {
          const nextPage = refresh ? 1 : page;

          const { data: newEvents, next } = await getEvents(nextPage);

          set({
            // If refresh, replace all. If not, append new to old.
            events: refresh ? newEvents : [...events, ...newEvents],
            page: nextPage + 1,
            hasMore: !!next,
            isLoading: false,
          });
        } catch (err) {
          set({
            isLoading: false,
            error: (err as Error).message || 'Failed to fetch events',
          });
        }
      },

      toggleInterest: (eventId: string) => {
        const currentIds = get().interestedIds;
        const exists = currentIds.includes(eventId);

        if (exists) {
          // Remove ID
          set({ interestedIds: currentIds.filter(id => id !== eventId) });
        } else {
          // Add ID
          set({ interestedIds: [...currentIds, eventId] });
        }
      },

      isInterested: (eventId: string) => {
        return get().interestedIds.includes(eventId);
      },
    }),
    {
      name: 'event-explorer-storage', // Key name in MMKV
      storage: createJSONStorage(() => mmkvStorage), // Use our MMKV adapter
    },
  ),
);
