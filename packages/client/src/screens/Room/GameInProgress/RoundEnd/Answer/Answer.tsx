import Text from '@Src/components/Text';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { EmitAnswer } from 'shared/src/typings/Room';

import styles from './AnswerStyle';

type AnswerProps = {
  answers: EmitAnswer;
};

export default function Answer({ answers }: AnswerProps) {
  const formatedAnswers = answers.map(({ answer }) => answer);

  return (
    <LinearGradient
      colors={['#a8e063', '#56ab2f']}
      style={styles.container}
      start={[1.0, 0.0]}
      end={[0.0, 1.0]}>
      <Text fontSize="lg" style={styles.answers}>
        {formatedAnswers.length > 1 ? formatedAnswers.join(' / ') : formatedAnswers}
      </Text>
    </LinearGradient>
  );
}
