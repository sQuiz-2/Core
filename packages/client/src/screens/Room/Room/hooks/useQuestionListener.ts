import playerScoreState from '@Src/global/Room/playerScore';
import questionState from '@Src/global/Room/question';
import scoreDetailState from '@Src/global/Room/scoreDetail';
import scoreboardState from '@Src/global/Room/scoreboard';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import timerState from '@Src/global/timerState';
import { useSound } from '@Src/utils/hooks/sound';
import { GameEvent, EmitQuestion, GameTime, GameRank } from '@squiz/shared';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import useListener from './useListener';

export default function useQuestionListener() {
  useListener(GameEvent.Question, handleNewQuestion);
  const setQuestion = useSetRecoilState(questionState);
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const setScoreDetail = useSetRecoilState(scoreDetailState);
  const [scoreboard, setScoreboard] = useRecoilState(scoreboardState);
  const [playerScore, setPlayerScore] = useRecoilState(playerScoreState);
  const startRoundSound = useSound({ source: require('@Assets/sounds/round-start.mp3') });

  useEffect(() => {
    return () => {
      setQuestion(null);
    };
  }, []);

  function handleNewQuestion(question: EmitQuestion) {
    updateQuestion(question);
    startRound();
    resetPlayersRank();
    resetPlayerRank();
  }

  function updateQuestion(question: EmitQuestion) {
    setQuestion(question);
  }

  function startRound() {
    setIsQuestionTime(true);
    setTime(GameTime.Question);
    startRoundSound.play();
    setScoreDetail(null);
  }

  function resetPlayersRank() {
    let updatedScoreboard = [...scoreboard];
    updatedScoreboard = updatedScoreboard.map((player) => ({
      ...player,
      rank: GameRank.RoundComing,
    }));
    setScoreboard(updatedScoreboard);
  }

  function resetPlayerRank() {
    if (!playerScore) return;
    const updatedPlayerScore = { ...playerScore, rank: GameRank.RoundComing };
    setPlayerScore(updatedPlayerScore);
  }
}
