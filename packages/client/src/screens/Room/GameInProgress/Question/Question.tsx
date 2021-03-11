import Card from '@Src/components/Card';
import ReportButton from '@Src/components/QuestionReport';
import Text from '@Src/components/Text';
import questionState from '@Src/global/Room/question';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import useGameInProgressQuestionStyle from './QuestionStyle';

export default function GameInProgressQuestion() {
  const styles = useGameInProgressQuestionStyle();
  const question = useRecoilValue(questionState);

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
      <ReportButton id={question.id} question={question.question} theme={question.theme} />
    </Card>
  );
}
