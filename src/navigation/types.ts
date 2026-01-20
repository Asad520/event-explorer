// src/navigation/types.ts
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';

// 1. The Tabs (All Events | Interested)
export type MainTabParamList = {
  EventList: undefined;
  InterestedEvents: undefined;
};

// 2. The Root Stack (Holds the Tabs + The Detail Screen)
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>; // Nested navigator
  EventDetail: { eventId: string }; // We pass the ID to the detail screen
};

// Helper types for your screens to use
export type EventListProps = MaterialTopTabScreenProps<
  MainTabParamList,
  'EventList'
>;

export type EventDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'EventDetail'
>;
