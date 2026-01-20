// src/navigation/types.ts
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';

// 1. The Tabs (All Events | Interested)
export type MainTabParamList = {
  EventList: undefined;
  InterestedEvents: undefined;
};

// 2. The Root Stack (Holds the Tabs + The Detail Screen)
export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  EventDetail: { eventId: string };
};

export type EventListProps = CompositeScreenProps<
  MaterialTopTabScreenProps<MainTabParamList, 'EventList'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type InterestedEventsProps = CompositeScreenProps<
  MaterialTopTabScreenProps<MainTabParamList, 'InterestedEvents'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type EventDetailProps = NativeStackScreenProps<
  RootStackParamList,
  'EventDetail'
>;
