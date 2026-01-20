import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Card = styled(TouchableOpacity)`
  flex-direction: row;
  background-color: ${({ theme }) => theme.colors.surface};
  margin: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: 12px;

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
