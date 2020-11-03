import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../../../global/isQuestionTimeState';
import timerState from '../../../global/timerState';
import { useSound } from '../../../utils/hooks/sound';
import Card from '../../Card/Card';
import Text from '../../Text';
import useQuestionStyle from './QuestionStyle';

export type QuestionType = {
  question: string;
  currentRound: number;
  maxRound: number;
  theme: string;
};

export type QuestionProps = {
  question: QuestionType | null;
};

export default function Question({ question }: QuestionProps) {
  const styles = useQuestionStyle();
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const startRoundSound = useSound({
    source: require('../../../../assets/sounds/round-start.mp3'),
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
