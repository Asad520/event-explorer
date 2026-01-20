import { useTheme } from 'styled-components/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EventDetailScreen } from '@src/screens/EventDetailScreen/EventDetailScreen';

import { MainTabs } from './MainTabs';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#FFFFFF', // White text on header
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: theme.colors.background }, // Global BG color
      }}
    >
      {/* 1. The Tab Screen (Home) */}
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ title: 'Event Explorer', headerShadowVisible: false }}
      />

      {/* 2. The Detail Screen (Pushes on top) */}
      <Stack.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ title: 'Event Details' }}
      />
    </Stack.Navigator>
  );
};
