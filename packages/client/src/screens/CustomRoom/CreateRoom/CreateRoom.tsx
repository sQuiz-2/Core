import { Radio, CheckBox } from '@Src/components/Buttons';
import { TitleCard } from '@Src/components/Card';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { get, post } from '@Src/utils/wrappedFetch';
import { FontAwesome5 } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation, useTheme } from '@react-navigation/native';
import { GetThemes, RoomCreateConfig } from '@squiz/shared/src/typings/Room';
import React, { useState, useEffect } from 'react';
import { Pressable, View } from 'react-native';
import { useRecoilState } from 'recoil';

import useCreateRoomStyle from './CreateRoomStyle';
import Themes from './Themes';

export default function CreateRoom() {
  const { colors } = useTheme();
  const styles = useCreateRoomStyle();
  const [selectedDifficulty, setSelectedDifficulty] = useState('Initié');
  const [antiCheat, setAntiCheat] = useState(false);
  const [players, setPlayers] = useState(42);
  const [timeToAnswer, setTimeToAnswer] = useState(14);
  const [timeBetweenGames, setTimeBetweenGames] = useState(30);
  const [selectedThemes, setSelectedThemes] = useState<number[]>([]);
  const navigation = useNavigation();
  const [user, setUser] = useRecoilState(userState);
  const [themes, setThemes] = useState<GetThemes>([]);

  function enableAllThemes() {
    setSelectedThemes(themes.map(({ id }) => id));
  }

  async function fetchThemes() {
    if (!user.token) return;
    try {
      const themes = await get<GetThemes>({ path: 'themes', token: user.token });
      if (!themes) return;
      setThemes(themes);
      setSelectedThemes(themes.map(({ id }) => id));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchThemes();
  }, []);

  function handleSelectedTheme(theme: number) {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes([...selectedThemes.filter((st) => st !== theme)]);
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  }

  async function createRoom() {
    if (!user.token) return;
    const roomConfig: RoomCreateConfig = {
      players,
      antiCheat,
      selectedDifficulty,
      timeToAnswer,
      timeBetweenGames,
      selectedThemes,
    };
    try {
      const room = await post<{ privateCode: string; roomId: string }>({
        path: 'room-create',
        body: roomConfig,
        token: user.token,
      });
      if (!room) return;
      await setUser({ ...user, privateCode: room.privateCode });
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
        maximumValue={200}
        step={1}
        minimumTrackTintColor={colors.text}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.text}
        value={players}
        onValueChange={setPlayers}
      />
      <Text style={[styles.title, styles.separator]}>Temps pour répondre</Text>
      <Text style={styles.playersNumber}>{timeToAnswer}s</Text>
      <Slider
        minimumValue={6}
        maximumValue={25}
        step={1}
        minimumTrackTintColor={colors.text}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.text}
        value={timeToAnswer}
        onValueChange={setTimeToAnswer}
      />
      <Text style={[styles.title, styles.separator]}>Temps entre les parties</Text>
      <Text style={styles.playersNumber}>{timeBetweenGames}s</Text>
      <Slider
        minimumValue={10}
        maximumValue={120}
        step={1}
        minimumTrackTintColor={colors.text}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.text}
        value={timeBetweenGames}
        onValueChange={setTimeBetweenGames}
      />
      <Text style={[styles.title, styles.separator]}>Thèmes</Text>
      <View style={styles.themeSelectAllContainer}>
        <Pressable onPress={enableAllThemes} style={styles.selectTheme}>
          <Text>Tout selectioner</Text>
        </Pressable>
        <Pressable onPress={() => setSelectedThemes([])} style={styles.selectTheme}>
          <Text>Tout retirer</Text>
        </Pressable>
      </View>
      <Themes
        themes={themes}
        selectedThemes={selectedThemes}
        handleSelectedTheme={handleSelectedTheme}
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
