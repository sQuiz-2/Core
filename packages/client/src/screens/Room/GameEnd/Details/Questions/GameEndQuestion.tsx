import { TitleCard } from '@Src/components/Card';
import Text from '@Src/components/Text';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { EmitQuestions } from 'shared/src/typings/Room';

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
            <Text style={styles.question}>{question}</Text>
            <Text>{answers.length > 1 ? answers.join(' / ') : answers}</Text>
          </View>
        ))}
      </ScrollView>
    </TitleCard>
  );
}
