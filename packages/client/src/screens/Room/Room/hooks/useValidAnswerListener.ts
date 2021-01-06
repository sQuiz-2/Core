import playerScoreState from '@Src/global/Room/playerScore';
import scoreDetailState from '@Src/global/Room/scoreDetail';
import { useSound } from '@Src/utils/hooks/sound';
import useListener from '@Src/utils/hooks/useListener';
import { GameEvent, EmitValidAnswer } from '@squiz/shared';
import { useRecoilState, useSetRecoilState } from 'recoil';

import useRankUpdate from './useRankUpdate';

export default function useValidAnswerListener() {
  useListener(GameEvent.ValidAnswer, performValidAnswer);
  const setScoreDetail = useSetRecoilState(scoreDetailState);
  const [playerScore, setPlayerScore] = useRecoilState(playerScoreState);
  const correctAnswerSound = useSound({ source: require('@Assets/sounds/right.mp3') });
  const rankUpdate = useRankUpdate();

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
