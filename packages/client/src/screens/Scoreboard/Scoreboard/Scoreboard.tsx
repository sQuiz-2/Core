import { TitleCard } from '@Src/components/Card';
import { CenterContainer, ResponsiveContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import { get } from '@Src/utils/wrappedFetch';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { computeLevel } from '@squiz/shared';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import useScoreboardStyle from './ScoreboardStyle';

type GetTopExperience = {
  username: string;
  experience: number;
};

type GetTopWin = {
  username: string;
  total_win: number;
};

type GetTopCorrect = {
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

  async function fetchScoreboards() {
    try {
      const scoreboardExperience = await get<GetTopExperience[]>({
        path: 'scoreboard/experience',
      });
      const scoreboardWin = await get<GetTopWin[]>({
        path: 'scoreboard/win/0',
      });
      const scoreboardCorrect = await get<GetTopCorrect[]>({
        path: 'scoreboard/correct/0',
      });
      if (!scoreboardExperience || !scoreboardWin || !scoreboardCorrect) return;
      setExperience(scoreboardExperience);
      setVictory(scoreboardWin);
      setCorrect(scoreboardCorrect);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchScoreboards();
  }, []);

  if (loading) {
    return (
      <CenterContainer>
        <ActivityIndicator />
      </CenterContainer>
    );
  }

  return (
    <ResponsiveContainer style={styles.container}>
      <TitleCard title="VICTOIRES" containerStyle={styles.column}>
        <View style={styles.row}>
          <Text style={styles.bold}>#</Text>
          <Text style={styles.bold}>Pseudo</Text>
          <FontAwesome5 name="trophy" size={14} color={colors.text} style={styles.bold} />
        </View>
        {victory.map((victory, i) => (
          <View
            key={i}
            style={[
              styles.row,
              {
                backgroundColor: i % 2 === 0 ? colors.primary : colors.card,
              },
            ]}>
            <Text>{i}</Text>
            <Text>{victory.username}</Text>
            <Text>{victory.total_win}</Text>
          </View>
        ))}
      </TitleCard>
      <TitleCard title="EXPÉRIENCE" containerStyle={styles.column}>
        <View style={styles.row}>
          <Text style={styles.bold}>#</Text>
          <Text style={styles.bold}>Pseudo</Text>
          <Text style={styles.bold}>Niveau</Text>
        </View>
        {experience.map((player, i) => (
          <View
            key={i}
            style={[
              styles.row,
              {
                backgroundColor: i % 2 === 0 ? colors.primary : colors.card,
              },
            ]}>
            <Text>{i}</Text>
            <Text>{player.username}</Text>
            <Text>{computeLevel(player.experience).level}</Text>
          </View>
        ))}
      </TitleCard>
      <TitleCard title="BONNES RÉPONSES" containerStyle={styles.column}>
        <View style={styles.row}>
          <Text style={styles.bold}>#</Text>
          <Text style={styles.bold}>Pseudo</Text>
          <FontAwesome5 name="medal" size={14} color={colors.text} style={styles.bold} />
        </View>
        {correct.map((victory, i) => (
          <View
            key={i}
            style={[
              styles.row,
              {
                backgroundColor: i % 2 === 0 ? colors.primary : colors.card,
              },
            ]}>
            <Text>{i}</Text>
            <Text>{victory.username}</Text>
            <Text>{victory.total_correct}</Text>
          </View>
        ))}
      </TitleCard>
    </ResponsiveContainer>
  );
}
