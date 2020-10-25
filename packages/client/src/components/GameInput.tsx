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
    <TextInput
      ref={inputRef}
      value={playerAnswer}
      onChangeText={(text) => setPlayerAnswer(text)}
      onKeyPress={(e) => checkKey(e)}
      multiline={false}
      style={[
        styles.input,
        { backgroundColor: colors.card, shadowColor: colors.border, color: colors.text },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    ...(Platform.OS === 'web' && { outlineWidth: 0 }),
    fontFamily: fontFamilies.text,
    fontSize: fontSizes.xxl,
    borderRadius: 10,
    padding: 20,
    shadowOffset: { width: 0, height: 8 },
  },
});
