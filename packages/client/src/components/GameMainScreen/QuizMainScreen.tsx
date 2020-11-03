import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import isQuestionTimeState from '../../global/isQuestionTimeState';
import timerState from '../../global/timerState';
import { useSocketListener } from '../../utils/hooks/socketListener';
import { useSound } from '../../utils/hooks/sound';
import Answer, { AnswerType } from './GameStatus/Answer';
import Info from './GameStatus/Info';
import Question, { QuestionType } from './GameStatus/Question';
import Winner from './GameStatus/Winner';

export enum RoomStatus {
  Waiting,
  Starting,
  InProgress,
  Ended,
}

export default function QuizMainScreen() {
  const setTime = useSetRecoilState(timerState);
  const setIsQuestionTime = useSetRecoilState(isQuestionTimeState);
  const status: { status: RoomStatus } = useSocketListener('status', RoomStatus.Waiting);
  const winner: string = useSocketListener('winner', 'UnPseudoRandom');
  const question: null | QuestionType = useSocketListener('question', null);
  const answers: AnswerType[] = useSocketListener('answer', []);
  const gameStartSound = useSound({ source: require('../../../assets/sounds/game-start.mp3') });

  useEffect(() => {
    switch (status.status) {
      case RoomStatus.Starting:
        gameStartSound.play();
        setIsQuestionTime(true);
        setTime(20);
        break;
      case RoomStatus.Ended:
        setTime(10);
        break;
    }
  }, [status]);

  switch (status.status) {
    case RoomStatus.Starting:
      return <Info />;
    case RoomStatus.InProgress:
      return (
        <>
          <Question question={question} />
          <Answer answers={answers} />
        </>
      );
    case RoomStatus.Ended:
      return <Winner winner={winner} />;
  }
  return <Info />;
}
