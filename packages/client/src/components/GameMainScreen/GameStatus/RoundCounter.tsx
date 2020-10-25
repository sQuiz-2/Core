import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useSocketListener } from '../../../utils/hooks/socketListener';
import Text from '../../Text';

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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 50,
  },
});
