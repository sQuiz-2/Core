import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import Text from '../../Text';

type Question = {
  question: string;
};

export default function Question({ question }: Question) {
  const fontSize = Platform.OS === 'web' ? 'xl' : 'md';

  if (!question) return null;

  return (
    <Text fontSize={fontSize} fontFamily="medium" style={styles.text}>
      {question}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: Platform.OS === 'web' ? 10 : 2,
    textAlign: 'center',
  },
});
