import Text from '@Src/components/Text';
import { useSocketListener } from '@Src/utils/hooks/socketListener';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import styles from './RoundCounterStyle';

export default function RoundCounter() {
  const { colors } = useTheme();
  const roundCountInfo: null | {
    current: number;
    total: number;
  } = useSocketListener('roundCounter', { current: 0, total: 15 });

  if (!roundCountInfo) return null;

  return (
    <View style={styles.container}>
      {Array.from({ length: roundCountInfo.total }, (v, k) => k).map((value) => {
        return (
          <Text key={value} fontSize="xl">
            <View
              style={[
                styles.dot,
                { backgroundColor: value >= roundCountInfo.current ? colors.border : colors.text },
              ]}
            />
          </Text>
        );
      })}
    </View>
  );
}
