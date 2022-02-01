import answerState from '@Src/global/Room/answer';
import playerRankState from '@Src/global/Room/playerRanks';
import questionState from '@Src/global/Room/question';
import roomInfosState from '@Src/global/Room/roomInfos';
import topTimeAnswerState from '@Src/global/Room/topTimeAnswers';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import timerState from '@Src/global/timerState';
import useListener from '@Src/utils/hooks/useListener';
import { GameEvent, EmitRoundEndInfo, GameTime, GameRank } from '@squiz/shared';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useRankUpdate from './useRankUpdate';

export default function useRoundEndListener() {
  useListener(GameEvent.Answer, handleAnswer);
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);
  const setAnswer = useSetRecoilState(answerState);
  const setTopTimeAnswer = useSetRecoilState(topTimeAnswerState);
  const ranks = useRecoilValue(playerRankState);
  const question = useRecoilValue(questionState);
  const updateRank = useRankUpdate();
  const roomInfos = useRecoilValue(roomInfosState);

  function handleAnswer(roundEndInfo: EmitRoundEndInfo) {
    setAnswer(roundEndInfo.answers);
    setTopTimeAnswer(roundEndInfo.topTimeAnswer);
    displayAnswer();
    setRankIfNeeded();
  }

  function displayAnswer() {
    setIsQuestionTime(false);
    setTime(roomInfos?.timeBetweenQuestion || GameTime.Answer);
  }

  function setRankIfNeeded() {
    if (!question) return;
    // If the player didn't answered
    if (ranks[question.currentRound] === GameRank.RoundComing) {
      updateRank(GameRank.NotAnswered);
    }
  }
}
