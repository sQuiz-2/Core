import Text from '@Src/components/Text';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import timerState from '@Src/global/timerState';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { EmitAnswer } from 'shared/src/typings/Room';

import styles from './GameInProgressAnswerStyle';

type GameInProgressAnswerProps = {
  answers: EmitAnswer;
};

export default function GameInProgressAnswer({ answers }: GameInProgressAnswerProps) {
  const [isQuestionTime, setIsQuestionTime] = useRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const formatedAnswers = answers.map(({ answer }) => answer);

  useEffect(() => {
    if (!answers) return;
    setIsQuestionTime(false);
    setTime(5);
  }, [answers]);

  if (isQuestionTime || answers.length <= 0) return null;

  return (
    <View style={{ paddingTop: 20 }}>
      <LinearGradient
        colors={['#a8e063', '#56ab2f']}
        style={styles.container}
        start={[1.0, 0.0]}
        end={[0.0, 1.0]}>
        <Text fontSize="lg" style={styles.answers}>
          {formatedAnswers.length > 1 ? formatedAnswers.join(' / ') : formatedAnswers}
        </Text>
      </LinearGradient>
    </View>
  );
}
