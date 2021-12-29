import Card from '@Src/components/Card/Card';
import Text from '@Src/components/Text';
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
import useCheatTab from './useCheatTab';

export default function GameInput() {
  const [playerAnswer, setPlayerAnswer] = useState('');
  const [cheating, setCheating] = useState(false);
  const roomSocket = useRecoilValue(roomSocketState);
  const question = useRecoilValue(questionState);
  const isQuestionTime = useRecoilValue(isQuestionTimeState);
  const { colors } = useTheme();
  const inputRef = createRef<TextInput>();
  const wrongSound = useSound({ source: require('@Assets/sounds/wrong.mp3') });
  const [life, setLife] = useState(4);
  useListener(GameEvent.WrongAnswer, wrongAnswer);
  useCheatTab(() => setCheating(true));

  useEffect(() => {
    if (!question) return;
    setLife(question.maxNumberOfGuesses);
    setCheating(false);
  }, [question]);

  function wrongAnswer() {
    wrongSound?.play();
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
    } else if (e.nativeEvent.key === 'Control') {
      setPlayerAnswer('Cultive toi au lieu de tricher');
    }
  }

  if (cheating) {
    return (
      <Text style={[styles.cheatText]}>
        Le changement de fenêtre est interdit dans ce salon. Veuillez attendre la prochaine
        question.
      </Text>
    );
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
        autoFocus
      />
      <GameTimer />
      <Life life={life} />
    </Card>
  );
}
