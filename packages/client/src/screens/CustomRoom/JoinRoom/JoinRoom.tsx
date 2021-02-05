import { TitleCard } from '@Src/components/Card';
import Text from '@Src/components/Text';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, View } from 'react-native';

import useJoinRoomStyle from './JoinRoomStyle';

export default function JoinRoom() {
  const { colors } = useTheme();
  const styles = useJoinRoomStyle();
  const [playerAnswer, setPlayerAnswer] = useState('');

  function connectRoom() {
    console.log('Start connection');
  }

  async function checkKey(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (e.nativeEvent.key === 'Enter') {
      e.preventDefault();
      connectRoom();
    }
  }

  return (
    <TitleCard title="REJOINDRE UNE PARTIE PRIVÉE" containerStyle={styles.container}>
      <Text>Pour rejoindre une partie privée, l'hôte doit vous communiquer le code d'accès.</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          maxLength={4}
          secureTextEntry
          textContentType="password"
          keyboardType="numeric"
          autoCompleteType="off"
          placeholder="CODE"
          onChangeText={(text) => setPlayerAnswer(text)}
          onKeyPress={(e) => checkKey(e)}
        />
        <FontAwesome5
          onPress={connectRoom}
          name="arrow-circle-right"
          size={20}
          color={colors.text}
        />
      </View>
    </TitleCard>
  );
}
