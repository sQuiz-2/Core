import { useTheme } from '@react-navigation/native';
import React, { useState, createRef } from 'react';
import {
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Platform,
} from 'react-native';
import { useRecoilValue } from 'recoil';

import { fontSizes, fontFamilies } from '../constant/theme';
import socketState from '../global/socket';
import Card from './Card/Card';
import { GameTimer } from './Timer';

export default function GameInput() {
  const [playerAnswer, setPlayerAnswer] = useState('');
  const socket = useRecoilValue(socketState);
  const { colors } = useTheme();
  const inputRef = createRef<TextInput>();

  function emitAnswer() {
    if (socket) {
      socket.emit('guess', playerAnswer);
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
    fontSize: fontSizes.xxl,
    flexGrow: 1,
    minWidth: 10,
  },
});
