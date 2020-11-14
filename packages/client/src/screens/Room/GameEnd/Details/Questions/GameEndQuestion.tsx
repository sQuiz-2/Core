import { TitleCard } from '@Src/components/Card';
import Text from '@Src/components/Text';
import React from 'react';
import { ScrollView, View } from 'react-native';

import useGameEndQuestionStyle from './GameEndQuestionStyle';

export default function GameEndQuestion() {
  const styles = useGameEndQuestionStyle();
  const rounds = [
    {
      id: 0,
      question: 'Is your feature request related to a problem? Please describe.',
      answers: ['Hello World', 'Hello JS'],
    },
  ];

  return (
    <TitleCard title="QUESTIONS" containerStyle={styles.container}>
      <ScrollView style={styles.scroll}>
        {rounds.map(({ question, answers, id }) => (
          <View key={id} style={styles.roundContainer}>
            <Text style={styles.question}>{question}</Text>
            <Text>{answers.length > 1 ? answers.join(' / ') : answers}</Text>
          </View>
        ))}
      </ScrollView>
    </TitleCard>
  );
}
