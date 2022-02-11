import Card from '@Src/components/Card/Card';
import { ResponsiveContainer } from '@Src/components/Containers';
import PlayerInfos from '@Src/components/PlayerInfo';
import scoreDetailState from '@Src/global/Room/scoreDetail';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import GameInput from '../GameInput';
import Guesses from '../Guesses';
import Question from '../Question';
import RoomTitle from '../RoomTitle';
import RoundCounter from '../RoundCounter';
import RoundEnd from '../RoundEnd';
import Scoreboard from '../Scoreboard';
import useGameInProgressStyle from './GameInProgressStyle';

export enum GuessStatus {
  Correct = 'correct',
  Incorrect = 'Incorrect',
  Waiting = 'Waiting',
}
export type Guess = {
  guess: string;
  guessStatus: GuessStatus;
  timeToAnswer?: string;
};

export default function GameInProgress() {
  const styles = useGameInProgressStyle();
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const scoreDetail = useRecoilValue(scoreDetailState);
  const isQuestionTime = useRecoilValue(isQuestionTimeState);

  function handleGuess(guess: string, guessStatus: GuessStatus) {
    setGuesses([...guesses, { guess, guessStatus }]);
  }

  function wrongGuess() {
    const waitingGuessIndex = guesses.findIndex(
      ({ guessStatus }) => guessStatus === GuessStatus.Waiting
    );
    if (waitingGuessIndex === -1) return;
    guesses[waitingGuessIndex].guessStatus = GuessStatus.Incorrect;
    setGuesses([...guesses]);
  }

  useEffect(() => {
    if (scoreDetail !== null) {
      const waitingGuessIndex = guesses.findIndex(
        ({ guessStatus }) => guessStatus === GuessStatus.Waiting
      );
      if (waitingGuessIndex === -1) return;
      guesses[waitingGuessIndex].guessStatus = GuessStatus.Correct;
      guesses[waitingGuessIndex].timeToAnswer = scoreDetail.timeToAnswer;
      setGuesses([...guesses]);
    }
  }, [scoreDetail]);

  useEffect(() => {
    if (isQuestionTime === true) {
      setGuesses([]);
    }
  }, [isQuestionTime]);

  return (
    <ResponsiveContainer>
      <View style={styles.info}>
        <Card style={styles.card}>
          <RoomTitle />
        </Card>
        <Card style={[styles.card, styles.grow, styles.scoreboard]}>
          <Scoreboard />
        </Card>
        <Card>
          <PlayerInfos />
        </Card>
      </View>
      <View style={styles.game}>
        <View style={styles.grow}>
          <Question />
          <RoundEnd />
        </View>
        <Guesses guesses={guesses} />
        <RoundCounter />
        <GameInput handleGuess={handleGuess} wrongGuess={wrongGuess} />
      </View>
    </ResponsiveContainer>
  );
}
