import styled from 'styled-components/native';

import { EmojiTextProps } from './types';

export const ToggleContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 16px;
`;

export const EmojiText = styled.Text<EmojiTextProps>`
  font-size: 16px;
  /* Apply margin based on which side the emoji is on */
  margin-right: ${({ side }) => (side === 'left' ? '8px' : '0px')};
  margin-left: ${({ side }) => (side === 'right' ? '8px' : '0px')};
`;

export const StyledSwitch = styled.Switch`
  /* Styled Components allows CSS-like syntax for RN transforms */
  transform: scale(0.8);
`;
