import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { lightTheme, darkTheme } from '@src/theme';
import { useThemeStore } from '@src/store/useThemeStore';
import { RootNavigator } from '@src/navigation/RootNavigator';

import { SafeWrapper } from './styles';

const App = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={
            isDarkMode
              ? darkTheme.colors.background
              : lightTheme.colors.background
          }
        />
        <SafeWrapper>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeWrapper>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
