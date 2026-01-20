import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';

import { getEvents } from '@src/api/client';

import { EventState } from './types';

// 1. INITIALIZE MMKV
const storage = createMMKV();

// 2. CREATE ZUSTAND STORAGE ADAPTER
// MMKV is synchronous, which is faster and easier than AsyncStorage
const mmkvStorage: StateStorage = {
  setItem: (name, value) => storage.set(name, value),
  getItem: name => storage.getString(name) ?? null,
  removeItem: name => storage.remove(name),
};

// 3. CREATE THE STORE
export const useEventStore = create<EventState>()(
  persist(
    (set, get) => ({
      // Initial State
      events: [],
      interestedIds: [],
      isLoading: false,
      error: null,

      // Actions
      fetchEvents: async () => {
        // If we already have data (rehydrated from MMKV), we silently update in background
        // or show a loader if it's the very first load.
        // For this assignment, let's show the loader to prove the network request happens.
        set({ isLoading: true, error: null });

        try {
          const data = await getEvents();
          set({ events: data, isLoading: false });
        } catch (err) {
          // ERROR HANDLING
          // If the API fails, we keep the existing 'events' (offline support).
          // We just update the error message.
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
