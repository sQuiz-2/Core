import React from 'react';
import { View } from 'react-native';

import Card from '../../Card/Card';
import Text from '../../Text';
import useQuestionStyle from './QuestionStyle';

export type QuestionType = {
  question: string;
  currentRound: number;
  maxRound: number;
  theme: string;
};

type QuestionProps = {
  question: QuestionType;
};

export default function Question({ question }: QuestionProps) {
  const styles = useQuestionStyle();

  if (!question) return null;

  return (
    <Card>
      <View style={styles.infoTop}>
        <Text fontSize="md" style={styles.questionCounter}>
          Question {question.currentRound + 1}/{question.maxRound}
        </Text>
        <Text fontSize="lg">{question.theme.toUpperCase()}</Text>
      </View>
      <Text fontSize="xxl" style={styles.question}>
        {question.question}
      </Text>
    </Card>
  );
}
