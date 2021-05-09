import { TitleCard } from '@Src/components/Card';
import QuestionInfos from '@Src/components/QuestionInfos';
import Text from '@Src/components/Text';
import questionsState from '@Src/global/Room/questions';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Linking, Platform, Pressable, ScrollView } from 'react-native';
import { useRecoilValue } from 'recoil';

import useGameEndQuestionStyle from './GameEndQuestionStyle';

export default function GameEndQuestion() {
  const { colors } = useTheme();
  const styles = useGameEndQuestionStyle();
  const questions = useRecoilValue(questionsState);

  function openLink(link: string) {
    if (Platform.OS === 'web') {
      window.open(link, '_blank');
    } else {
      Linking.openURL(link);
    }
  }

  return (
    <>
      <TitleCard title="QUESTIONS" containerStyle={styles.container}>
        <ScrollView style={styles.scroll}>
          {questions.map(({ question, answers, id, theme }) => (
            <QuestionInfos
              key={id}
              id={id}
              answers={answers}
              theme={theme}
              question={question}
              displayReport
            />
          ))}
        </ScrollView>
      </TitleCard>
      <Text fontSize="md" style={{ textAlign: 'center' }}>
        Vous pouvez proposer vos propres questions en utilisant{' '}
        <Pressable
          onPress={() =>
            openLink(
              'https://docs.google.com/forms/d/e/1FAIpQLSdwMnH332LgNZrsfKjOCQThjZwA9CvlJ4XS5BBSrcUFsNVZJA/viewform'
            )
          }>
          <Text fontSize="md" style={{ color: colors.notification }}>
            ce formulaire
          </Text>
        </Pressable>
        .
      </Text>
    </>
  );
}
