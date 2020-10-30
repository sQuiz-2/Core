import React from 'react';
import { StyleSheet, View } from 'react-native';

import Card from '../../Card/Card';
import Text from '../../Text';

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
  if (!question) return null;

  return (
    <Card style={styles.container}>
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

const styles = StyleSheet.create({
  container: {},
  infoTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  question: {
    textAlign: 'center',
    paddingVertical: 40,
  },
  questionCounter: {
    fontWeight: 'bold',
  },
});
