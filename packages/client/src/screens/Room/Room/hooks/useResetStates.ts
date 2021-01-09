import answerState from '@Src/global/Room/answer';
import completeScoreboardState from '@Src/global/Room/completeScoreboard';
import playerRankState from '@Src/global/Room/playerRanks';
import playerScoreState from '@Src/global/Room/playerScore';
import questionState from '@Src/global/Room/question';
import roomStatusState from '@Src/global/Room/roomStatus';
import scoreboardState from '@Src/global/Room/scoreboard';
import { GameRank } from '@squiz/shared';
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';

export default function useReset() {
  const ranksReset = useResetRecoilState(playerRankState);
  const answerReset = useResetRecoilState(answerState);
  const questionReset = useResetRecoilState(questionState);
  const roomStatusReset = useResetRecoilState(roomStatusState);
  const completeScoreboardReset = useResetRecoilState(completeScoreboardState);
  const [scoreboard, setScoreboard] = useRecoilState(scoreboardState);
  const [playerScore, setPlayerScore] = useRecoilState(playerScoreState);

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  function reset() {
    ranksReset();
    answerReset();
    questionReset();
    roomStatusReset();
    completeScoreboardReset();
    if (playerScore) {
      const score = { ...playerScore, position: 1, score: 0, rank: GameRank.RoundComing };
      setPlayerScore(score);
    }
    const updatedScoreboard = scoreboard.map((player) => ({
      ...player,
      rank: GameRank.RoundComing,
      score: 0,
      position: 1,
    }));
    setScoreboard(updatedScoreboard);
  }

  return reset;
}
