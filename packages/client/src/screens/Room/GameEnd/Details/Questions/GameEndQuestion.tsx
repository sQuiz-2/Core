import { TitleCard } from '@Src/components/Card';
import QuestionReport from '@Src/components/QuestionReport';
import Text from '@Src/components/Text';
import questionsState from '@Src/global/Room/questions';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import useGameEndQuestionStyle from './GameEndQuestionStyle';

export default function GameEndQuestion() {
  const styles = useGameEndQuestionStyle();
  const questions = useRecoilValue(questionsState);

  return (
    <TitleCard title="QUESTIONS" containerStyle={styles.container}>
      <ScrollView style={styles.scroll}>
        {questions.map(({ question, answers, id }) => (
          <View key={id} style={styles.roundContainer}>
            <View style={styles.questionContainer}>
              <Text style={styles.question}>{question}</Text>
              <Text>{answers.length > 1 ? answers.join(' / ') : answers}</Text>
            </View>
            <View style={styles.reportContainer}>
              <QuestionReport id={id} />
            </View>
          </View>
        ))}
      </ScrollView>
    </TitleCard>
  );
}
