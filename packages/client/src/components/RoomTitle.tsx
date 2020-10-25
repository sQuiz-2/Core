import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useSocketListener } from '../utils/hooks/socketListener';
import CenterContainer from './CenterContainer';
import Text from './Text';

export default function QuizContainer() {
  const { colors } = useTheme();
  const roomInfos: { title: string; difficulty: string } | null = useSocketListener('infos', null);

  if (!roomInfos) {
    return (
      <CenterContainer style={{ backgroundColor: colors.card }}>
        <ActivityIndicator color={colors.text} />
      </CenterContainer>
    );
  }

  return (
    <Text fontFamily="title" fontSize="xxl">
      SALON {roomInfos.difficulty.toLocaleUpperCase()}
    </Text>
  );
}
