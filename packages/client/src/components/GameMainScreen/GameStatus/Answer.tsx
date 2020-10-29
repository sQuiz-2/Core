import React from 'react';
import { StyleSheet, Platform } from 'react-native';

import Text from '../../Text';

type AnswerProps = {
  answers: { answer: string; prefix: null | string }[];
};

export default function Answer({ answers }: AnswerProps) {
  const fontSize = Platform.OS === 'web' ? 'xl' : 'md';
  const formatedAnswer = answers.map((answer) => {
    if (answer.prefix) {
      return `${answer.prefix} ${answer.answer}`;
    }
    return answer.answer;
  });

  if (answers.length <= 0) return null;

  return (
    <>
      <Text fontSize={fontSize} fontFamily="title" style={styles.text}>
        {answers.length > 1 ? 'Les réponses étaient:' : 'La réponse était:'}
      </Text>
      <Text fontSize={fontSize} fontFamily="title" style={styles.text}>
        {formatedAnswer.length > 1 ? formatedAnswer.join(' / ') : formatedAnswer}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    padding: Platform.OS === 'web' ? 10 : 2,
    textAlign: 'center',
  },
});
