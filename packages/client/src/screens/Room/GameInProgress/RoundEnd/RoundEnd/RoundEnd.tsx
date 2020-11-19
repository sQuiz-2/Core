import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import timerState from '@Src/global/timerState';
import { useSocketListener } from '@Src/utils/hooks/socketListener';
import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { GameEvent } from 'shared/src/enums/Game';
import { EmitAnswer, EmitScoreDetails } from 'shared/src/typings/Room';

import Answer from '../Answer';
import ScoreDetail from '../ScoreDetail';
import useRoundEndStyle from './RoundEndStyle';

export default function RoundEnd() {
  const answers: EmitAnswer = useSocketListener(GameEvent.Answer, []);
  const score: EmitScoreDetails | null = useSocketListener(GameEvent.ScoreDetail, null);
  const [scoreDetail, setScoreDetail] = useState<EmitScoreDetails | null>(null);
  const styles = useRoundEndStyle(scoreDetail);
  const [isQuestionTime, setIsQuestionTime] = useRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const timeout = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    if (!answers) return;
    setIsQuestionTime(false);
    setTime(5);
    // Reset ScoreDetail at the begining of the next round
    timeout.current = setTimeout(() => {
      setScoreDetail(null);
    }, 5 * 1000);
  }, [answers]);

  useEffect(() => {
    if (!score) return;
    setScoreDetail(score);
  }, [score]);

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  if (isQuestionTime || answers.length <= 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.answer}>
        <Answer answers={answers} />
      </View>
      {scoreDetail && (
        <View style={styles.scoreDetail}>
          <ScoreDetail scoreDetail={scoreDetail} />
        </View>
      )}
    </View>
  );
}
