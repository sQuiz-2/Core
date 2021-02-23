import answerState from '@Src/global/Room/answer';
import scoreDetailState from '@Src/global/Room/scoreDetail';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import Answer from '../Answer';
import ScoreDetail from '../ScoreDetail';
import TopTimeAnswer from '../TopTimeAnswer';
import useRoundEndStyle from './RoundEndStyle';

export default function RoundEnd() {
  const scoreDetail = useRecoilValue(scoreDetailState);
  const answers = useRecoilValue(answerState);
  const styles = useRoundEndStyle(scoreDetail);
  const isQuestionTime = useRecoilValue(isQuestionTimeState);

  if (isQuestionTime || !answers || answers.length < 1) return null;

  return (
    <View>
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
      <TopTimeAnswer />
    </View>
  );
}
