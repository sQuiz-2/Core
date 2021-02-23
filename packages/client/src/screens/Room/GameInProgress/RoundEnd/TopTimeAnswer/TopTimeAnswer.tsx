import TopRow from '@Src/components/ScoreBoard/TopRow';
import topTimeAnswerState from '@Src/global/Room/topTimeAnswers';
import React from 'react';
import { useRecoilValue } from 'recoil';

export default function TopTimeAnswer() {
  const topTimeAnswer = useRecoilValue(topTimeAnswerState);
  return (
    <>
      {topTimeAnswer.map((player) => (
        <TopRow player={player} />
      ))}
    </>
  );
}
