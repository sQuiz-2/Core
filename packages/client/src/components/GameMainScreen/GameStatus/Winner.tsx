import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';

import Text from '../../Text';

type Winner = {
  winner: string;
};

export default function Winner({ winner }: Winner) {
  const fontSize = Platform.OS === 'web' ? 'xl' : 'md';

  return (
    <View style={styles.container}>
      <Text fontSize={fontSize} fontFamily="medium" style={styles.text}>
        {winner}
      </Text>
      <Text fontSize={fontSize} fontFamily="regular" style={styles.text}>
        gagne la partie !
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    padding: Platform.OS === 'web' ? 10 : 2,
  },
});
