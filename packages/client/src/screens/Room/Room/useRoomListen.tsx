import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import timerState from '@Src/global/timerState';
import { useRoomListener } from '@Src/utils/hooks/roomListener';
import { useSound } from '@Src/utils/hooks/sound';
import {
  EmitAnswer,
  EmitQuestion,
  EmitScoreDetails,
  EmitValidAnswer,
  GameEvent,
  GameRank,
  GameTime,
} from '@squiz/shared';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

export default function useRoomListen() {
  const validAnswer = useRoomListener<null | EmitValidAnswer>(GameEvent.ValidAnswer, null);
  const question = useRoomListener<null | EmitQuestion>(GameEvent.Question, null);
  const answers = useRoomListener<EmitAnswer>(GameEvent.Answer, []);

  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const setTime = useSetRecoilState(timerState);

  const [ranks, setRanks] = useState(Array(15).fill(GameRank.RoundComing));
  const [scoreDetail, setScoreDetail] = useState<null | EmitScoreDetails>(null);

  const startRoundSound = useSound({ source: require('@Assets/sounds/round-start.mp3') });
  const correctAnswerSound = useSound({ source: require('@Assets/sounds/right.mp3') });

  function displayAnswers() {
    setIsQuestionTime(false);
    setTime(GameTime.Answer);
  }

  useEffect(() => {
    if (!answers) return;
    displayAnswers();
    updateRanksIfNeeded();
  }, [answers]);

  function updateRanksIfNeeded() {
    if (!question) return;
    // If the player didn't answered
    if (ranks[question.currentRound] === GameRank.RoundComing) {
      updateRanks(GameRank.NotAnswered);
    }
  }

  function updateRanks(rank: number) {
    if (!question) return;
    const updatedRanks = [...ranks];
    updatedRanks[question.currentRound] = rank;
    setRanks(updatedRanks);
  }

  function performValidAnswer() {
    if (!validAnswer) return;
    correctAnswerSound.play();
    updateRanks(validAnswer.rank);
    setScoreDetail(validAnswer.scoreDetail);
  }

  useEffect(() => {
    performValidAnswer();
  }, [validAnswer]);

  function startRound() {
    setIsQuestionTime(true);
    setTime(GameTime.Question);
    startRoundSound.play();
    setScoreDetail(null);
  }

  useEffect(() => {
    if (!question) return;
    startRound();
  }, [question]);

  return { question, answers, ranks, scoreDetail };
}
