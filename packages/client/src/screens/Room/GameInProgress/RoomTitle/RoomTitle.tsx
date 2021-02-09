import { CenterContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import roomInfosState from '@Src/global/Room/roomInfos';
import { useTheme } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import styles from './RoomTitleStyle';

export default function RoomTitle() {
  const { colors } = useTheme();
  const roomInfos = useRecoilValue(roomInfosState);
  const [blurred, setBlurred] = useState(true);

  if (!roomInfos) {
    return (
      <CenterContainer style={{ backgroundColor: colors.card }}>
        <ActivityIndicator color={colors.text} />
      </CenterContainer>
    );
  }
  if (roomInfos.isPrivate) {
    return (
      <Pressable style={styles.privateContainer} onPress={() => setBlurred(!blurred)}>
        <Text fontFamily="title" fontSize="xxl">
          CODE:
        </Text>
        <View style={styles.privateCodeContainer}>
          <Text fontFamily="title" fontSize="xxl">
            {roomInfos.title.toLocaleUpperCase()}
          </Text>
          <BlurView intensity={blurred ? 30 : 0} style={styles.codeBlur} />
        </View>
      </Pressable>
    );
  } else {
    return (
      <Text fontFamily="title" fontSize="xxl">
        {roomInfos.title.toLocaleUpperCase()}
      </Text>
    );
  }
}
