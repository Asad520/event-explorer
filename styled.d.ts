// src/types/styled.d.ts
import 'styled-components/native';

// 1. Extend the default theme interface
declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      primary: string;
      secondary: string;
      danger: string;
      border: string;
      success: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    typography: {
      header: string;
      subheader: string;
      body: string;
      caption: string;
      weight: {
        regular: string;
        bold: string;
      };
    };
  }
}
