import Card from '@Src/components/Card';
import Report from '@Src/components/QuestionReport';
import Text from '@Src/components/Text';
import { EmitQuestion } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';

import useGameInProgressQuestionStyle from './QuestionStyle';

type GameInProgressQuestionProps = {
  question: null | EmitQuestion;
};

export default function GameInProgressQuestion({ question }: GameInProgressQuestionProps) {
  const styles = useGameInProgressQuestionStyle();

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
      <Report id={question.id} />
    </Card>
  );
}
