import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { lightTheme, darkTheme } from '@src/theme';
import { RootNavigator } from '@src/navigation/RootNavigator';
import { useThemeStore } from '@src/store/useThemeStore';

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
        <SafeAreaView edges={['top']} style={{ flex: 1 }}>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
