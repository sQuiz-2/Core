import { useTheme } from '@react-navigation/native';
import React, { useState, createRef, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Platform,
} from 'react-native';
import { useRecoilValue } from 'recoil';
import { GameEvent } from 'shared/src/enums/Game';
import { parseAnswer } from 'shared/src/functions/Answer';
import { EmitAnswerIsValid } from 'shared/src/typings/Room';

import { fontSizes, fontFamilies } from '../constant/theme';
import socketState from '../global/socket';
import { useSocketListener } from '../utils/hooks/socketListener';
import { useSound } from '../utils/hooks/sound';
import Card from './Card/Card';
import { GameTimer } from './Timer';

export default function GameInput() {
  const [playerAnswer, setPlayerAnswer] = useState('');
  const socket = useRecoilValue(socketState);
  const { colors } = useTheme();
  const inputRef = createRef<TextInput>();
  const resultAnswer: null | EmitAnswerIsValid = useSocketListener(GameEvent.AnswerIsValid, null);
  const foundSound = useSound({ source: require('../../assets/sounds/right.mp3') });
  const wrongSound = useSound({ source: require('../../assets/sounds/wrong.mp3') });

  useEffect(() => {
    if (!resultAnswer) return;
    if (resultAnswer.valid) {
      foundSound.play();
    } else {
      wrongSound.play();
    }
  }, [resultAnswer]);

  function emitAnswer() {
    if (socket) {
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
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    ...(Platform.OS === 'web' && { outlineWidth: 0 }),
    fontFamily: fontFamilies.text,
    fontSize: fontSizes.lg,
    flexGrow: 1,
    minWidth: 10,
  },
});
