import React, { useState, createRef } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  Platform,
} from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRecoilValue } from 'recoil';

import Button from '../components/Button';
import { fontSizes, fontFamilies } from '../constant/theme';
import socketState from '../global/socket';
import { useScreenWidth } from '../utils/hooks/screenWidth';

export default function GameInput() {
  const [playerAnswer, setPlayerAnswer] = useState('');
  const socket = useRecoilValue(socketState);
  const { colors } = useTheme();
  const isLargeScreen = useScreenWidth();
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
    <View style={styles.answer}>
      <TextInput
        ref={inputRef}
        value={playerAnswer}
        onChangeText={(text) => setPlayerAnswer(text)}
        onKeyPress={(e) => checkKey(e)}
        multiline={false}
        style={[
          styles.input,
          { backgroundColor: colors.text, width: isLargeScreen ? '30%' : '50%' },
        ]}
      />
      <Button onPress={emitAnswer}>Envoyer</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  answer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 'auto',
    marginBottom: 10,
  },
  input: {
    ...(Platform.OS === 'web' && { outlineWidth: 0 }),
    borderRadius: 20,
    paddingLeft: 15,
    marginRight: 20,
    fontFamily: fontFamilies.regular,
    fontSize: fontSizes.lg,
  },
});
