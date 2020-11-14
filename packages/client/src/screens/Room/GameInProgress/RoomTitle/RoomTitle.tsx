import { CenterContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Difficulty } from 'shared/src/enums/Difficulty';

type RoomTitleProps = {
  roomInfos: { difficulty: Difficulty } | null;
};

export default function RoomTitle({ roomInfos }: RoomTitleProps) {
  const { colors } = useTheme();

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
