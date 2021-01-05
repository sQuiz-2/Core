import answerState from '@Src/global/Room/answer';
import playerRankState from '@Src/global/Room/playerRanks';
import questionState from '@Src/global/Room/question';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import timerState from '@Src/global/timerState';
import { GameEvent, EmitAnswer, GameTime, GameRank } from '@squiz/shared';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useListener from './useListener';
import useRankUpdate from './useRankUpdate';

export default function useAnswerListener() {
  useListener(GameEvent.Answer, handleAnswer);
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const setAnswer = useSetRecoilState(answerState);
  const ranks = useRecoilValue(playerRankState);
  const question = useRecoilValue(questionState);
  const updateRank = useRankUpdate();

  useEffect(() => {
    return () => {
      setAnswer(null);
    };
  }, []);

  function handleAnswer(answer: EmitAnswer) {
    setAnswer(answer);
    displayAnswer();
    setRankIfNeeded();
  }

  function displayAnswer() {
    setIsQuestionTime(false);
    setTime(GameTime.Answer);
  }

  function setRankIfNeeded() {
    if (!question) return;
    // If the player didn't answered
    if (ranks[question.currentRound] === GameRank.RoundComing) {
      updateRank(GameRank.NotAnswered);
    }
  }
}