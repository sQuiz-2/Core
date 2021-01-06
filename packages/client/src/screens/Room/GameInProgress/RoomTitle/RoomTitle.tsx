import { CenterContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import roomInfosState from '@Src/global/Room/roomInfos';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { useRecoilValue } from 'recoil';

export default function RoomTitle() {
  const { colors } = useTheme();
  const roomInfos = useRecoilValue(roomInfosState);

  if (!roomInfos) {
    return (
      <CenterContainer style={{ backgroundColor: colors.card }}>
        <ActivityIndicator color={colors.text} />
      </CenterContainer>
    );
  }
  return (
    <Text fontFamily="title" fontSize="xxl">
      {roomInfos.title.toLocaleUpperCase()}
    </Text>
  );
}
