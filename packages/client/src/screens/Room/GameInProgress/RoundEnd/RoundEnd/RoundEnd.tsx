import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import { EmitScoreDetails, EmitAnswer } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import Answer from '../Answer';
import ScoreDetail from '../ScoreDetail';
import useRoundEndStyle from './RoundEndStyle';

type RoundEndProps = {
  answers: EmitAnswer;
  scoreDetail: EmitScoreDetails | null;
};

export default function RoundEnd({ answers, scoreDetail }: RoundEndProps) {
  const styles = useRoundEndStyle(scoreDetail);
  const isQuestionTime = useRecoilValue(isQuestionTimeState);

  if (isQuestionTime || answers.length < 1) return null;

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
