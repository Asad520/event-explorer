import { useTheme } from 'styled-components/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { EventListScreen } from '@src/screens/EventListScreen/EventListScreen';
import { InterestedEventsScreen } from '@src/screens/InterestedEventsScreen/InterestedEventsScreen';

import { MainTabParamList } from './types';

const Tab = createMaterialTopTabNavigator<MainTabParamList>();

export const MainTabs = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarIndicatorStyle: { backgroundColor: theme.colors.primary },
        tabBarStyle: { backgroundColor: theme.colors.surface },
        tabBarLabelStyle: { fontWeight: 'bold', textTransform: 'none' },
      }}
    >
      <Tab.Screen
        name="EventList"
        component={EventListScreen}
        options={{ title: 'All Events' }}
      />
      <Tab.Screen
        name="InterestedEvents"
        component={InterestedEventsScreen}
        options={{ title: 'Interested' }}
      />
    </Tab.Navigator>
  );
};
