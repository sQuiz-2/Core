import playerRankState from '@Src/global/Room/playerRanks';
import questionState from '@Src/global/Room/question';
import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function useRankUpdate() {
  const [ranks, setRanks] = useRecoilState(playerRankState);
  const question = useRecoilValue(questionState);

  const rankUpdate = useCallback(
    (rank: number) => {
      if (!question) return;
      const updatedRanks = [...ranks];
      updatedRanks[question.currentRound] = rank;
      setRanks(updatedRanks);
    },
    [question, ranks]
  );

  return rankUpdate;
}
