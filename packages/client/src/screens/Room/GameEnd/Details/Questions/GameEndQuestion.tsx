import { TitleCard } from '@Src/components/Card';
import QuestionInfos from '@Src/components/QuestionInfos';
import questionsState from '@Src/global/Room/questions';
import React from 'react';
import { ScrollView } from 'react-native';
import { useRecoilValue } from 'recoil';

import useGameEndQuestionStyle from './GameEndQuestionStyle';

export default function GameEndQuestion() {
  const styles = useGameEndQuestionStyle();
  const questions = useRecoilValue(questionsState);

  return (
    <TitleCard title="QUESTIONS" containerStyle={styles.container}>
      <ScrollView style={styles.scroll}>
        {questions.map(({ question, answers, id }) => (
          <QuestionInfos key={id} id={id} answers={answers} question={question} displayReport />
        ))}
      </ScrollView>
    </TitleCard>
  );
}
