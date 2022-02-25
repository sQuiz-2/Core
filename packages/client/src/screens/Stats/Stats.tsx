import { TitleCard } from '@Src/components/Card';
import { CenterContainer, ResponsiveContainer } from '@Src/components/Containers';
import Text from '@Src/components/Text';
import userState from '@Src/global/userState';
import { get } from '@Src/utils/wrappedFetch';
import { GetDifficultyFromId, MeBasic } from '@squiz/shared';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { useRecoilValue } from 'recoil';

import StatByThemes from './StatByThemes';
import useStatsStyle from './StatsStyle';

export default function Stats() {
  const user = useRecoilValue(userState);
  const [stats, setStats] = useState<MeBasic>();
  const styles = useStatsStyle();

  async function fetchStats() {
    if (!user.token) return;
    try {
      const result = await get<MeBasic>({ path: 'me-basic', token: user.token });
      if (!result) return;
      setStats(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, [user]);

  if (!stats) {
    return (
      <CenterContainer>
        <ActivityIndicator />
      </CenterContainer>
    );
  }

  return (
    <ResponsiveContainer style={styles.responsiveContainer}>
      <View style={styles.container}>
        <TitleCard title="STATISTIQUES DES PARTIES" containerStyle={styles.column}>
          {stats.gameStats.length === 0 && (
            <Text fontSize="lg" style={styles.bold}>
              Aucune statistique disponnible
            </Text>
          )}
          {stats.gameStats.map((game) => {
            return (
              <View style={styles.row}>
                <Image style={styles.image} source={require('@Assets/images/keyboard.png')} />
                <View>
                  <Text fontSize="lg" style={styles.bold}>
                    {GetDifficultyFromId(game.difficultyId).title}
                  </Text>
                  <Text fontSize="sm">Jouées : {game.played}</Text>
                  <Text fontSize="sm">Gagnées : {game.win}</Text>
                  <Text fontSize="sm">Podium : {game.podium}</Text>
                </View>
              </View>
            );
          })}
        </TitleCard>
        <TitleCard title="STATISTIQUES DES QUESTIONS" containerStyle={styles.column}>
          {stats.gameStats.length === 0 && (
            <Text fontSize="lg" style={styles.bold}>
              Aucune statistique disponnible
            </Text>
          )}
          {stats.roundStats.map((game) => {
            return (
              <View style={styles.row}>
                <Image style={styles.image} source={require('@Assets/images/keyboard.png')} />
                <View>
                  <Text fontSize="lg" style={styles.bold}>
                    {GetDifficultyFromId(game.difficultyId).title}
                  </Text>
                  <Text fontSize="sm">Jouées : {game.played}</Text>
                  <Text fontSize="sm">
                    Réussies : {game.correct}({Math.floor((game.correct / game.played) * 100)}%)
                  </Text>
                </View>
              </View>
            );
          })}
        </TitleCard>
      </View>
      <View style={styles.separator}>
        <StatByThemes />
      </View>
    </ResponsiveContainer>
  );
}
