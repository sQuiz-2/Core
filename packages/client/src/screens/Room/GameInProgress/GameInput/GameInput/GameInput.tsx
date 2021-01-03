import Card from '@Src/components/Card/Card';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import roomSocketState from '@Src/global/roomSocket';
import { useRoomListener } from '@Src/utils/hooks/roomListener';
import { useSound } from '@Src/utils/hooks/sound';
import { useTheme } from '@react-navigation/native';
import { GameEvent, parseAnswer, EmitQuestion } from '@squiz/shared';
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
  const roomSocket = useRecoilValue(roomSocketState);
  const isQuestionTime = useRecoilValue(isQuestionTimeState);
  const { colors } = useTheme();
  const inputRef = createRef<TextInput>();
  const wrongAnswer = useRoomListener<null | string>(GameEvent.WrongAnswer, null);
  const wrongSound = useSound({ source: require('@Assets/sounds/wrong.mp3') });
  const [life, setLife] = useState(4);

  useEffect(() => {
    if (!question) return;
    setLife(question.maxNumberOfGuesses);
  }, [question]);

  useEffect(() => {
    if (!wrongAnswer) return;
    wrongSound.play();
    setLife(life - 1);
  }, [wrongAnswer]);

  function emitAnswer() {
    if (roomSocket && isQuestionTime && life > 0) {
      const parsedAnswer = parseAnswer(playerAnswer);
      roomSocket.emit('guess', parsedAnswer);
      setPlayerAnswer('');
    }
  }

  async function checkKey(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (e.nativeEvent.key === 'Enter') {
      e.preventDefault();
      emitAnswer();
    }
  }

  useEffect(() => {
    focus();
  }, []);

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
      <Life life={life} />
    </Card>
  );
}
