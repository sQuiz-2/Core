import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import Text from '../../Text';

export default function Info() {
  const fontSize = Platform.OS === 'web' ? 'xl' : 'md';

  return (
    <Text fontSize={fontSize} fontFamily="regular" style={styles.text}>
      La partie va bientôt commencer !
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: Platform.OS === 'web' ? 10 : 2,
    textAlign: 'center',
  },
});
