import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { EventCard } from '@src/components/EventCard';
import { lightTheme } from '@src/theme';
import { Event } from '@src/api/types';

// Mock Date format function to avoid timezone issues in snapshots/text checks
jest.mock('@src/utils/date', () => ({
  formatEventDate: () => 'Mon, Sep 5',
}));

const mockEvent: Event = {
  id: '1',
  name: 'React Native Conf',
  date: '2024-09-05T09:00:00Z',
  location: 'Wrocław, Poland',
  thumbnail: 'https://example.com/img.jpg',
  image: 'https://example.com/full.jpg',
  description: 'Cool event',
  organizer: 'Callstack',
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe('EventCard Component', () => {
  it('renders event details correctly', () => {
    const { getByText } = renderWithTheme(
      <EventCard event={mockEvent} onPress={() => {}} />,
    );

    // Verify Name and Location are on screen
    expect(getByText('React Native Conf')).toBeTruthy();
    expect(getByText('📍 Wrocław, Poland')).toBeTruthy();
    expect(getByText('Mon, Sep 5')).toBeTruthy();
  });

  it('triggers onPress when clicked', () => {
    const mockOnPress = jest.fn();
    const { getByText } = renderWithTheme(
      <EventCard event={mockEvent} onPress={mockOnPress} />,
    );

    // Find the title and click the parent container
    // (In RNTL, finding an inner element and firing press bubbles up)
    fireEvent.press(getByText('React Native Conf'));

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
