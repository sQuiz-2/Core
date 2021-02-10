import { TitleCard } from '@Src/components/Card';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { get } from '@Src/utils/wrappedFetch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, View } from 'react-native';
import { useRecoilState } from 'recoil';

import useJoinRoomStyle from './JoinRoomStyle';

export default function JoinRoom() {
  const { colors } = useTheme();
  const styles = useJoinRoomStyle();
  const [code, setCode] = useState('');
  const [user, setUser] = useRecoilState(userState);
  const navigation = useNavigation();
  const [error, setError] = useState<string>();

  async function connectRoom() {
    setError(undefined);
    if (code.length !== 4) {
      setError('Aucune partie trouvée, code invalide');
    } else {
      try {
        const roomId = await get<string | undefined>({ path: 'room-join/' + code });
        console.log('Receive: ', roomId);
        if (roomId) {
          setUser({ ...user, privateCode: code.toUpperCase() });
          navigation.navigate('Room', { id: roomId });
        } else {
          setError('Aucune partie trouvée, code invalide');
        }
      } catch (error) {
        console.error(error);
      }
    }
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
          onChangeText={(text) => setCode(text)}
          onKeyPress={(e) => checkKey(e)}
        />
        <FontAwesome5
          onPress={connectRoom}
          name="arrow-circle-right"
          size={20}
          color={colors.text}
        />
      </View>
      <Text style={styles.errorMessage}>{error}</Text>
    </TitleCard>
  );
}
