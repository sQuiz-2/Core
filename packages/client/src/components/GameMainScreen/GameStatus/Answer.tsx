import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Text from '../../Text';

type AnswerProps = {
  answers: { answer: string; prefix: null | string }[];
};

export default function Answer({ answers }: AnswerProps) {
  const formatedAnswer = answers.map((answer) => {
    if (answer.prefix) {
      return `${answer.prefix} ${answer.answer}`;
    }
    return answer.answer;
  });

  if (answers.length <= 0) return null;

  return (
    <View style={{ paddingTop: 20 }}>
      <LinearGradient
        colors={['#a8e063', '#56ab2f']}
        style={styles.container}
        start={[1.0, 0.0]}
        end={[0.0, 1.0]}>
        <Text fontSize="lg" style={styles.answers}>
          {formatedAnswer.length > 1 ? formatedAnswer.join(' / ') : formatedAnswer}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  answers: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    paddingTop: 20,
    shadowOffset: undefined,
    paddingVertical: 20,
    borderRadius: 10,
  },
});
