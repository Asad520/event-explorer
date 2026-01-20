import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { lightTheme } from '@src/theme';
import { RootNavigator } from '@src/navigation/RootNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider theme={lightTheme}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;
