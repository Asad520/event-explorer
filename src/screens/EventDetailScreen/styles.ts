import styled from 'styled-components/native';

import { ButtonProps } from './types';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const ScrollContainer = styled.ScrollView`
  flex: 1;
`;

export const HeroImage = styled.Image`
  width: 100%;
  height: 250px;
  background-color: ${({ theme }) => theme.colors.border};
`;

export const Content = styled.View`
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: 100px; /* Space for the bottom button */
`;

export const DateText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: ${({ theme }) => theme.typography.body};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 28px; /* Large Header */
  font-weight: bold;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const SectionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.caption};
  margin-top: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: bold;
  text-transform: uppercase;
`;

export const InfoText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body};
  line-height: 24px;
`;

// Floating Bottom Bar
export const BottomBar = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  padding-bottom: 30px; /* Safe area for iPhone X+ */
  border-top-width: 1px;
  border-top-color: ${({ theme }) => theme.colors.border};
`;

export const InterestButton = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ theme, isInterested }) =>
    isInterested ? theme.colors.surface : theme.colors.primary};
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary};
  padding: 16px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text<ButtonProps>`
  color: ${({ theme, isInterested }) =>
    isInterested ? theme.colors.primary : '#FFFFFF'};
  font-weight: bold;
  font-size: 16px;
`;
