import Card from '@Src/components/Card/Card';
import questionState from '@Src/global/Room/question';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import roomSocketState from '@Src/global/roomSocket';
import { useSound } from '@Src/utils/hooks/sound';
import useListener from '@Src/utils/hooks/useListener';
import { useTheme } from '@react-navigation/native';
import { GameEvent, parseAnswer } from '@squiz/shared';
import React, { useState, createRef, useEffect } from 'react';
import { TextInput, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';
import { useRecoilValue } from 'recoil';

import GameTimer from '../GameTimer';
import Life from '../Life';
import styles from './GameInputStyle';

export default function GameInput() {
  const [playerAnswer, setPlayerAnswer] = useState('');
  const roomSocket = useRecoilValue(roomSocketState);
  const question = useRecoilValue(questionState);
  const isQuestionTime = useRecoilValue(isQuestionTimeState);
  const { colors } = useTheme();
  const inputRef = createRef<TextInput>();
  const wrongSound = useSound({ source: require('@Assets/sounds/wrong.mp3') });
  const [life, setLife] = useState(4);
  useListener(GameEvent.WrongAnswer, wrongAnswer);

  useEffect(() => {
    if (!question) return;
    setLife(question.maxNumberOfGuesses);
  }, [question]);

  function wrongAnswer() {
    wrongSound.play();
    setLife(life - 1);
  }

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
