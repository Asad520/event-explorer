import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { SearchBar } from '@src/components/SearchBar';
import { lightTheme } from '@src/theme';

// Helper to wrap components in ThemeProvider (since we use styled-components)
const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{component}</ThemeProvider>);
};

describe('SearchBar Component', () => {
  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = renderWithTheme(
      <SearchBar placeholder="Search here..." />,
    );

    // Check if element exists
    expect(getByPlaceholderText('Search here...')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = renderWithTheme(
      <SearchBar onChangeText={mockOnChange} placeholder="Search" />,
    );

    const input = getByPlaceholderText('Search');

    // Simulate typing "Jazz"
    fireEvent.changeText(input, 'Jazz');

    // Check if function was called with "Jazz"
    expect(mockOnChange).toHaveBeenCalledWith('Jazz');
  });
});
