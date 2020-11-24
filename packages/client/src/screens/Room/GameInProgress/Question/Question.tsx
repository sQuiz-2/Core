import Card from '@Src/components/Card/Card';
import Text from '@Src/components/Text';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import timerState from '@Src/global/timerState';
import { useSound } from '@Src/utils/hooks/sound';
import { EmitQuestion } from '@squiz/shared';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';

import useGameInProgressQuestionStyle from './QuestionStyle';

type GameInProgressQuestionProps = {
  question: null | EmitQuestion;
};

export default function GameInProgressQuestion({ question }: GameInProgressQuestionProps) {
  const styles = useGameInProgressQuestionStyle();

  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const startRoundSound = useSound({
    source: require('@Assets/sounds/round-start.mp3'),
  });

  useEffect(() => {
    if (!question) return;
    setIsQuestionTime(true);
    setTime(15);
    startRoundSound.play();
  }, [question]);

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
