import { Appearance } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';

import { STORE_KEYS } from '@src/utils/constants';

import { ThemeState } from './types';

const storage = createMMKV();

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      // 2. Check system preference on initialization
      isDarkMode: Appearance.getColorScheme() === 'dark',

      toggleTheme: () => set(state => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: STORE_KEYS.THEME_STORE,
      storage: createJSONStorage(() => ({
        setItem: (name, value) => storage.set(name, value),
        getItem: name => storage.getString(name) ?? null,
        removeItem: name => storage.remove(name),
      })),
    },
  ),
);
