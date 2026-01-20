import { useTheme } from 'styled-components/native';

import { useThemeStore } from '@src/store/useThemeStore';

import { ToggleContainer, EmojiText, StyledSwitch } from './styles';

export const ThemeHeaderToggle = () => {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <ToggleContainer
      onPress={toggleTheme}
      activeOpacity={0.7}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <EmojiText side="left">☀️</EmojiText>
      <StyledSwitch
        value={isDarkMode}
        onValueChange={toggleTheme}
        trackColor={{ false: '#767577', true: theme.colors.secondary }}
        thumbColor={'#f4f3f4'}
      />
      <EmojiText side="right">🌙</EmojiText>
    </ToggleContainer>
  );
};
