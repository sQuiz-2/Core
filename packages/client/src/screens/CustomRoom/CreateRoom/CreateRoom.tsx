import { Radio, CheckBox } from '@Src/components/Buttons';
import { TitleCard } from '@Src/components/Card';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { getFromStore, setInStore, StorageEnum } from '@Src/utils/storage';
import { get, post } from '@Src/utils/wrappedFetch';
import { FontAwesome5 } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useNavigation, useTheme } from '@react-navigation/native';
import { GetThemes, RoomCreateConfig } from '@squiz/shared/src/typings/Room';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useRecoilState } from 'recoil';

import useCreateRoomStyle from './CreateRoomStyle';
import Themes from './Themes';

export default function CreateRoom() {
  const { colors } = useTheme();
  const styles = useCreateRoomStyle();
  const [selectedDifficulty, setSelectedDifficulty] = useState('Initié');
  const [antiCheat, setAntiCheat] = useState(false);
  const [startGameManually, setStartGameManually] = useState(false);
  const [startRoundManually, setStartRoundManually] = useState(false);
  const [players, setPlayers] = useState(42);
  const [timeToAnswer, setTimeToAnswer] = useState(14);
  const [timeBetweenQuestion, setTimeBetweenQuestion] = useState(5);
  const [timeBetweenGames, setTimeBetweenGames] = useState(30);
  const [rounds, setRounds] = useState(15);
  const [selectedThemes, setSelectedThemes] = useState<number[]>([]);
  const navigation = useNavigation();
  const [user, setUser] = useRecoilState(userState);
  const [themes, setThemes] = useState<GetThemes>([]);

  function enableAllThemes() {
    setSelectedThemes(themes.map(({ id }) => id));
  }

  async function setMyPreviousSettings() {
    const myCustomSettings = await getFromStore<RoomCreateConfig>(StorageEnum.CustomGameConfig);
    if (!myCustomSettings) return;
    setSelectedThemes(myCustomSettings.selectedThemes);
    setPlayers(myCustomSettings.players);
    setTimeToAnswer(myCustomSettings.timeToAnswer);
    setAntiCheat(myCustomSettings.antiCheat);
    setTimeBetweenQuestion(myCustomSettings.timeBetweenQuestion);
    setSelectedDifficulty(myCustomSettings.selectedDifficulty);
    setTimeBetweenGames(myCustomSettings.timeBetweenGames);
    setRounds(myCustomSettings.rounds);
    setStartGameManually(myCustomSettings.startGameManually);
    setStartRoundManually(myCustomSettings.startRoundManually);
  }

  async function fetchThemes() {
    try {
      const themes = await get<GetThemes>({ path: 'themes' });
      if (!themes) return;
      setThemes(themes);
      setSelectedThemes(themes.map(({ id }) => id));
      await setMyPreviousSettings();
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
      timeBetweenQuestion,
      timeBetweenGames,
      selectedThemes,
      rounds,
      startGameManually,
      startRoundManually,
    };
    try {
      await setInStore(StorageEnum.CustomGameConfig, roomConfig);
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
          choices={['Initié', 'Confirmé', 'Expert', 'Aléatoire']}
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
      <Text style={[styles.title, styles.separator]}>Temps entre les questions</Text>
      <Text style={styles.playersNumber}>{timeBetweenQuestion}s</Text>
      <Slider
        minimumValue={5}
        maximumValue={25}
        step={1}
        minimumTrackTintColor={colors.text}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.text}
        value={timeBetweenQuestion}
        onValueChange={setTimeBetweenQuestion}
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
      <Text style={[styles.title, styles.separator]}>Rounds</Text>
      <Text style={styles.playersNumber}>{rounds}</Text>
      <Slider
        minimumValue={10}
        maximumValue={45}
        step={1}
        minimumTrackTintColor={colors.text}
        maximumTrackTintColor={colors.border}
        thumbTintColor={colors.text}
        value={rounds}
        onValueChange={setRounds}
      />
      <Text style={[styles.title, styles.separator]}>Catégories</Text>
      <View style={styles.themeSelectAllContainer}>
        <Pressable onPress={enableAllThemes} style={styles.selectTheme}>
          <Text>Tout selectioner</Text>
        </Pressable>
        <Pressable onPress={() => setSelectedThemes([])} style={styles.selectTheme}>
          <Text>Tout retirer</Text>
        </Pressable>
      </View>
      {themes.length <= 0 ? (
        <ActivityIndicator />
      ) : (
        <Themes
          themes={themes}
          selectedThemes={selectedThemes}
          handleSelectedTheme={handleSelectedTheme}
        />
      )}
      <View style={{ paddingTop: 10 }}>
        <Text style={[styles.title, styles.separator]}>Paramètres</Text>
        <View style={{ width: 'fit-content', paddingTop: 10 }}>
          <View style={styles.boxContainer}>
            <Text style={[styles.title, styles.separator]}>Activer l'anti-triche</Text>
            <View style={styles.box}>
              <CheckBox
                selected={antiCheat}
                onSelect={(newSelected) => setAntiCheat(newSelected)}
              />
            </View>
          </View>
          <View style={styles.boxContainer}>
            <Text style={[styles.title, styles.separator]}>Démarrer la partie manuellement</Text>
            <View style={styles.box}>
              <CheckBox
                selected={startGameManually}
                onSelect={(newSelected) => setStartGameManually(newSelected)}
              />
            </View>
          </View>
          <View style={styles.boxContainer}>
            <Text style={[styles.title, styles.separator]}>
              Commencer les questions manuellement
            </Text>
            <View style={styles.box}>
              <CheckBox
                selected={startRoundManually}
                onSelect={(newSelected) => setStartRoundManually(newSelected)}
              />
            </View>
          </View>
        </View>
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
