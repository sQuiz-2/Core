import { Radio, CheckBox } from '@Src/components/Buttons';
import { TitleCard } from '@Src/components/Card';
import Text from '@Src/components/Text';
import homeSocketState from '@Src/global/homeSocket';
import userState from '@Src/global/userState';
import useListener from '@Src/utils/hooks/useListener';
import { FontAwesome5 } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation, useTheme } from '@react-navigation/native';
import { RoomEvent } from '@squiz/shared';
import { RoomCreateConfig } from '@squiz/shared/src/typings/Room';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';

import useCreateRoomStyle from './CreateRoomStyle';

export default function CreateRoom() {
  const { colors } = useTheme();
  const styles = useCreateRoomStyle();
  const [selectedDifficulty, setSelectedDifficulty] = useState('Initié');
  const [antiCheat, setAntiCheat] = useState(false);
  const [players, setPlayers] = useState(42);
  const socket = useRecoilValue(homeSocketState);
  useListener(RoomEvent.RoomCreated, roomCreated, true);
  const navigation = useNavigation();
  const [user, setUser] = useRecoilState(userState);

  function roomCreated({ roomId, privateCode }: { roomId: string; privateCode: string }) {
    setUser({ ...user, privateCode });
    navigation.navigate('Room', { id: roomId });
  }

  function createRoom() {
    const roomConfig: RoomCreateConfig = {
      players,
      antiCheat,
      selectedDifficulty,
    };
    socket?.emit(RoomEvent.CreateRoom, roomConfig);
  }

  return (
    <TitleCard title="CRÉER UNE PARTIE">
      <Text style={styles.title}>Difficulté</Text>
      <View style={styles.radioContainer}>
        <Radio
          choices={['Initié', 'Confirmé', 'Expert', 'Aléatoire']}
          selected={selectedDifficulty}
          onSelect={(newSelected) => setSelectedDifficulty(newSelected)}
        />
      </View>
      <Text style={[styles.title, styles.separator]}>Nombre de joueurs</Text>
      <Text style={styles.playersNumber}>{players}</Text>
      <Slider
        minimumValue={10}
        maximumValue={250}
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
