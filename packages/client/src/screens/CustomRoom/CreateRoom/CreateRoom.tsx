import { Radio, CheckBox } from '@Src/components/Buttons';
import { TitleCard } from '@Src/components/Card';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { post } from '@Src/utils/wrappedFetch';
import { FontAwesome5 } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation, useTheme } from '@react-navigation/native';
import { RoomCreateConfig } from '@squiz/shared/src/typings/Room';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useRecoilState } from 'recoil';

import useCreateRoomStyle from './CreateRoomStyle';

export default function CreateRoom() {
  const { colors } = useTheme();
  const styles = useCreateRoomStyle();
  const [selectedDifficulty, setSelectedDifficulty] = useState('Initié');
  const [antiCheat, setAntiCheat] = useState(false);
  const [players, setPlayers] = useState(42);
  const navigation = useNavigation();
  const [user, setUser] = useRecoilState(userState);

  async function createRoom() {
    if (!user.token) return;
    const roomConfig: RoomCreateConfig = {
      players,
      antiCheat,
      selectedDifficulty,
    };
    try {
      const room = await post<{ privateCode: string; roomId: string }>({
        path: 'room-create',
        body: roomConfig,
        token: user.token,
      });
      if (!room) return;
      setUser({ ...user, privateCode: room.privateCode });
      navigation.navigate('Room', { id: room.roomId });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <TitleCard title="CRÉER UNE PARTIE">
      <Text style={styles.title}>Difficulté</Text>
      <View style={styles.radioContainer}>
        <Radio
          choices={['Initié', 'Confirmé', 'Expert']}
          selected={selectedDifficulty}
          onSelect={(newSelected) => setSelectedDifficulty(newSelected)}
        />
      </View>
      <Text style={[styles.title, styles.separator]}>Nombre de joueurs</Text>
      <Text style={styles.playersNumber}>{players}</Text>
      <Slider
        minimumValue={10}
        maximumValue={100}
        step={1}
        minimumTrackTintColor={colors.text}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.text}
        value={players}
        onValueChange={setPlayers}
      />
      <Text style={[styles.title, styles.separator]}>Anti-triche</Text>
      <View style={styles.cheatBox}>
        <CheckBox selected={antiCheat} onSelect={(newSelected) => setAntiCheat(newSelected)} />
      </View>
      <Pressable onPress={createRoom} style={styles.createButton}>
        <FontAwesome5
          name="plus-square"
          size={20}
          color={colors.text}
          solid
          style={styles.createButtonIcon}
        />
        <Text fontSize="lg">Créer le salon</Text>
      </Pressable>
    </TitleCard>
  );
}
