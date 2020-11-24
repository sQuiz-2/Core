import Card from '@Src/components/Card/Card';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import socketState from '@Src/global/socket';
import { useSocketListener } from '@Src/utils/hooks/socketListener';
import { useSound } from '@Src/utils/hooks/sound';
import { useTheme } from '@react-navigation/native';
import { EmitAnswerIsValid, GameEvent, parseAnswer, EmitQuestion } from '@squiz/shared';
import React, { useState, createRef, useEffect } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useRecoilValue } from 'recoil';

import GameTimer from '../GameTimer';
import Life from '../Life';
import styles from './GameInputStyle';

type GameInputProps = {
  question: EmitQuestion | null;
};

export default function GameInput({ question }: GameInputProps) {
  const [playerAnswer, setPlayerAnswer] = useState('');
  const socket = useRecoilValue(socketState);
  const isQuestionTime = useRecoilValue(isQuestionTimeState);
  const { colors } = useTheme();
  const inputRef = createRef<TextInput>();
  const resultAnswer: null | EmitAnswerIsValid = useSocketListener(GameEvent.AnswerIsValid, null);
  const foundSound = useSound({ source: require('@Assets/sounds/right.mp3') });
  const wrongSound = useSound({ source: require('@Assets/sounds/wrong.mp3') });
  const [lifes, setLifes] = useState(4);

  useEffect(() => {
    if (!question) return;
    setLifes(question.maxNumberOfGuesses);
  }, [question]);

  useEffect(() => {
    if (!resultAnswer) return;
    if (resultAnswer.valid) {
      foundSound.play();
    } else {
      wrongSound.play();
      setLifes(lifes - 1);
    }
  }, [resultAnswer]);

  function emitAnswer() {
    if (socket && isQuestionTime && lifes > 0) {
      const parsedAnswer = parseAnswer(playerAnswer);
      socket.emit('guess', parsedAnswer);
      setPlayerAnswer('');
      focus();
    }
  }

  async function checkKey(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (e.nativeEvent.key === 'Enter') {
      e.preventDefault();
      emitAnswer();
    }
  }

  function focus() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <Card style={styles.container}>
      <TextInput
        ref={inputRef}
        value={playerAnswer}
        onChangeText={(text) => setPlayerAnswer(text)}
        onKeyPress={(e) => checkKey(e)}
        multiline={false}
        style={[styles.input, { color: colors.text }]}
      />
      <GameTimer />
      <Life lifes={lifes} />
    </Card>
  );
}
