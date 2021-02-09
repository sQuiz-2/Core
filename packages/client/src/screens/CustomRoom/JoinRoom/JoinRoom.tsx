import { TitleCard } from '@Src/components/Card';
import Text from '@Src/components/Text';
import homeSocketState from '@Src/global/homeSocket';
import userState from '@Src/global/userState';
import useListener from '@Src/utils/hooks/useListener';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { RoomEvent } from '@squiz/shared';
import React, { useState } from 'react';
import { NativeSyntheticEvent, TextInput, TextInputKeyPressEventData, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import useJoinRoomStyle from './JoinRoomStyle';

export default function JoinRoom() {
  const { colors } = useTheme();
  const styles = useJoinRoomStyle();
  const [code, setCode] = useState('');
  const socket = useRecoilValue(homeSocketState);
  useListener(RoomEvent.PrivateRoomJoin, joinPrivateRoom, true);
  const [user, setUser] = useRecoilState(userState);
  const navigation = useNavigation();
  const [error, setError] = useState<string>();

  function joinPrivateRoom(roomId: number | undefined) {
    if (roomId) {
      setUser({ ...user, privateCode: code });
      navigation.navigate('Room', { id: roomId });
    } else {
      setError('Aucune partie trouvée, code invalide');
    }
  }

  function connectRoom() {
    setError(undefined);
    if (code.length !== 4) {
      setError('Aucune partie trouvée, code invalide');
    } else {
      socket?.emit(RoomEvent.JoinPrivate, code.toUpperCase());
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
