import { TitleCard } from '@Src/components/Card';
import { CenterContainer, ResponsiveContainer } from '@Src/components/Containers';
import PlayerModal from '@Src/components/Modal/Player';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { get } from '@Src/utils/wrappedFetch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { computeLevel } from '@squiz/shared';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import DifficultyPicker from '../DifficultyPicker';
import useScoreboardStyle from './ScoreboardStyle';

type GetTopExperience = {
  id: number;
  username: string;
  experience: number;
};

type GetTopWin = {
  id: number;
  username: string;
  total_win: number;
};

type GetTopCorrect = {
  id: number;
  username: string;
  total_correct: number;
};

export default function Scoreboard() {
  const styles = useScoreboardStyle();
  const { colors } = useTheme();
  const [experience, setExperience] = useState<GetTopExperience[]>([]);
  const [victory, setVictory] = useState<GetTopWin[]>([]);
  const [correct, setCorrect] = useState<GetTopCorrect[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userState);
  const [modalVisible, setModalVisible] = useState(false);
  const [playerIdModal, setPlayerIdModal] = useState<number>();

  async function fetchScoreboards() {
    await fetchWins('0');
    await fetchCorrect('0');
    await fetchExperience();
    setLoading(false);
  }

  async function fetchExperience() {
    try {
      const scoreboardExperience = await get<GetTopExperience[]>({
        path: 'scoreboard/experience',
      });
      if (!scoreboardExperience) return;
      setExperience(scoreboardExperience);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchWins(difficulty: string) {
    try {
      const scoreboardWin = await get<GetTopWin[]>({
        path: 'scoreboard/win/' + difficulty,
      });
      if (!scoreboardWin) return;
      setVictory(scoreboardWin);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchCorrect(difficulty: string) {
    try {
      const scoreboardCorrect = await get<GetTopCorrect[]>({
        path: 'scoreboard/correct/' + difficulty,
      });
      if (!scoreboardCorrect) return;
      setCorrect(scoreboardCorrect);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchScoreboards();
  }, []);

  function displayPlayerModal(playerId: number) {
    setPlayerIdModal(playerId);
    setModalVisible(true);
  }

  if (loading) {
    return (
      <CenterContainer>
        <ActivityIndicator />
      </CenterContainer>
    );
  }

  return (
    <ResponsiveContainer style={styles.container}>
      <PlayerModal playerId={playerIdModal} visible={modalVisible} setVisible={setModalVisible} />
      <TitleCard title="VICTOIRES" containerStyle={styles.column}>
        <DifficultyPicker onChange={fetchWins} />
        <View style={styles.row}>
          <Text style={styles.bold}>#</Text>
          <Text style={styles.bold}>Pseudo</Text>
          <FontAwesome5 name="trophy" size={14} color={colors.text} style={styles.bold} />
        </View>
        {victory.map((player, i) => {
          const textColor = user.username === player.username ? colors.notification : colors.text;
          return (
            <Pressable
              onPress={() => displayPlayerModal(player.id)}
              key={player.id}
              style={[
                styles.row,
                {
                  backgroundColor: i % 2 === 0 ? colors.primary : colors.card,
                },
              ]}>
              <Text style={{ color: textColor }}>{i + 1}</Text>
              <Text style={{ color: textColor }}>{player.username}</Text>
              <Text style={{ color: textColor }}>{player.total_win}</Text>
            </Pressable>
          );
        })}
      </TitleCard>
      <TitleCard title="EXPÉRIENCE" containerStyle={styles.column}>
        <View style={[styles.row, styles.fakePickerHeight]}>
          <Text style={styles.bold}>#</Text>
          <Text style={styles.bold}>Pseudo</Text>
          <Text style={styles.bold}>Niveau</Text>
        </View>
        {experience.map((player, i) => {
          const textColor = user.username === player.username ? colors.notification : colors.text;
          return (
            <Pressable
              onPress={() => displayPlayerModal(player.id)}
              key={player.id}
              style={[
                styles.row,
                {
                  backgroundColor: i % 2 === 0 ? colors.primary : colors.card,
                },
              ]}>
              <Text style={{ color: textColor }}>{i + 1}</Text>
              <Text style={{ color: textColor }}>{player.username}</Text>
              <Text style={{ color: textColor }}>{computeLevel(player.experience).level}</Text>
            </Pressable>
          );
        })}
      </TitleCard>
      <TitleCard title="BONNES RÉPONSES" containerStyle={styles.column}>
        <DifficultyPicker onChange={fetchCorrect} />
        <View style={styles.row}>
          <Text style={styles.bold}>#</Text>
          <Text style={styles.bold}>Pseudo</Text>
          <FontAwesome5 name="medal" size={14} color={colors.text} style={styles.bold} />
        </View>
        {correct.map((player, i) => {
          const textColor = user.username === player.username ? colors.notification : colors.text;
          return (
            <Pressable
              onPress={() => displayPlayerModal(player.id)}
              key={player.id}
              style={[
                styles.row,
                {
                  backgroundColor: i % 2 === 0 ? colors.primary : colors.card,
                },
              ]}>
              <Text style={{ color: textColor }}>{i + 1}</Text>
              <Text style={{ color: textColor }}>{player.username}</Text>
              <Text style={{ color: textColor }}>{player.total_correct}</Text>
            </Pressable>
          );
        })}
      </TitleCard>
    </ResponsiveContainer>
  );
}
