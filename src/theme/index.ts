// src/theme/index.ts
import { DefaultTheme } from 'styled-components/native';

export const lightTheme: DefaultTheme = {
  colors: {
    background: '#F8F9FA',
    surface: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#6C757D',
    primary: '#007AFF', // Standard iOS Blue
    secondary: '#5AC8FA',
    danger: '#FF3B30',
    border: '#E9ECEF',
    success: '#34C759',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  typography: {
    header: '24px',
    subheader: '18px',
    body: '16px',
    caption: '14px',
    weight: {
      regular: '400',
      bold: '700',
    },
  },
};

export const darkTheme: DefaultTheme = {
  ...lightTheme,
  colors: {
    background: '#121212',
    surface: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#AAAAAA',
    primary: '#0A84FF', // iOS Dark Blue
    secondary: '#5AC8FA',
    danger: '#FF453A',
    border: '#333333',
    success: '#32D74B',
  },
};
