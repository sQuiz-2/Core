import Text from '@Src/components/Text';
import { Answer as AnswerType } from '@squiz/shared';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';

import styles from './AnswerStyle';

type AnswerProps = {
  answers: AnswerType[];
};

export default function Answer({ answers }: AnswerProps) {
  const formattedAnswers = answers.map(({ answer }) => answer);

  return (
    <LinearGradient
      colors={['#a8e063', '#56ab2f']}
      style={styles.container}
      start={[1.0, 0.0]}
      end={[0.0, 1.0]}>
      <Text fontSize="lg" style={styles.answers}>
        {formattedAnswers.length > 1 ? formattedAnswers.join(' / ') : formattedAnswers}
      </Text>
    </LinearGradient>
  );
}
