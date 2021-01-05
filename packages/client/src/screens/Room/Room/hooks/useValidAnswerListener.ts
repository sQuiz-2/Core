import playerRankState from '@Src/global/Room/playerRanks';
import playerScoreState from '@Src/global/Room/playerScore';
import scoreDetailState from '@Src/global/Room/scoreDetail';
import { useSound } from '@Src/utils/hooks/sound';
import { GameEvent, EmitValidAnswer, GameRank } from '@squiz/shared';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import useListener from './useListener';
import useRankUpdate from './useRankUpdate';

export default function useValidAnswerListener() {
  useListener(GameEvent.ValidAnswer, performValidAnswer);
  const setScoreDetail = useSetRecoilState(scoreDetailState);
  const [playerScore, setPlayerScore] = useRecoilState(playerScoreState);
  const setRanks = useSetRecoilState(playerRankState);
  const correctAnswerSound = useSound({ source: require('@Assets/sounds/right.mp3') });
  const rankUpdate = useRankUpdate();

  useEffect(() => {
    return () => {
      setRanks(Array(15).fill(GameRank.RoundComing));
      setPlayerScore(null);
    };
  }, []);

  function performValidAnswer(validAnswer: EmitValidAnswer) {
    correctAnswerSound.play();
    rankUpdate(validAnswer.rank);
    updateScore(validAnswer.position, validAnswer.score, validAnswer.rank);
    setScoreDetail(validAnswer.scoreDetail);
  }

  function updateScore(position: number, score: number, rank: number) {
    if (!playerScore?.id) return;
    const updatedScore = { ...playerScore!, position, score, rank };
    setPlayerScore(updatedScore);
  }
}
