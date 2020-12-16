import { TitleCard } from '@Src/components/Card';
import QuestionReport from '@Src/components/QuestionReport';
import Text from '@Src/components/Text';
import { EmitQuestions } from '@squiz/shared';
import React from 'react';
import { ScrollView, View } from 'react-native';

import useGameEndQuestionStyle from './GameEndQuestionStyle';

type GameEndQuestionProps = {
  questions: EmitQuestions;
};

export default function GameEndQuestion({ questions }: GameEndQuestionProps) {
  const styles = useGameEndQuestionStyle();

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
