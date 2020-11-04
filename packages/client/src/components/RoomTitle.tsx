import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Difficulty } from 'squiz-backend/app/Enums/Difficulty';

import { useSocketListener } from '../utils/hooks/socketListener';
import CenterContainer from './CenterContainer';
import Text from './Text';

export default function QuizContainer() {
  const { colors } = useTheme();
  const roomInfos: { difficulty: Difficulty } | null = useSocketListener('infos', null);

  if (!roomInfos) {
    return (
      <CenterContainer style={{ backgroundColor: colors.card }}>
        <ActivityIndicator color={colors.text} />
      </CenterContainer>
    );
  }
  return (
    <Text fontFamily="title" fontSize="xxl">
      SALON {roomInfos.difficulty.name.toLocaleUpperCase()}
    </Text>
  );
}
