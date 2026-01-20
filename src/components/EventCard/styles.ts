import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Card = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surface};
  margin: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 12px;
  position: relative; /* Essential for absolute positioning of RemoveButton */

  /* Shadow for iOS */
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;

  /* Shadow for Android */
  elevation: 3;
`;

export const Thumbnail = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const Content = styled.View`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  /* Add right padding so long titles don't overlap the X button */
  padding-right: 24px;
`;

export const DateText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.caption};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  margin-bottom: 4px;
  text-transform: uppercase;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body};
  font-weight: ${({ theme }) => theme.typography.weight.bold};
  margin-bottom: 4px;
`;

export const LocationText = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.caption};
`;

export const RemoveButton = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.background}; /* Subtle BG */
  align-items: center;
  justify-content: center;
  z-index: 10;

  /* Optional: Mild shadow to pop off the card */
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 2px;
  elevation: 2;
`;

export const RemoveIcon = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 14px;
  font-weight: bold;
  margin-top: -2px; /* Visual center alignment */
`;
