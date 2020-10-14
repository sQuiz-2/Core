import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useSocketListener } from '../../../utils/hooks/socketListener';
import Text from '../../Text';

export default function RoundCounter() {
  const roundCountInfo: null | {
    current: number;
    total: number;
  } = useSocketListener('roundCounter', { current: 0, total: 15 });

  if (!roundCountInfo) return null;

  return (
    <View style={styles.container}>
      {Array.from({ length: roundCountInfo.total }, (v, k) => k).map((value) => {
        return <Text fontSize="xl">{value >= roundCountInfo.current ? '○' : '●'}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
