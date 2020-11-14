import { ScoreboardRow } from '@Src/components/ScoreBoard';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Image, ScrollView } from 'react-native';

import useGameEndTopScoreboardStyle from './GameEndTopScoreboardStyle';

type GameEndTopScoreBoardProps = {
  players: DisplayPlayer[];
};

export default function GameEndTopScoreBoard({ players }: GameEndTopScoreBoardProps) {
  const { colors } = useTheme();
  const styles = useGameEndTopScoreboardStyle();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('@Assets/images/podium.png')} style={styles.image} />
      </View>
      <View style={styles.topContainer}>
        <ScrollView style={styles.scroll}>
          {players.map((player) => {
            const bgColors = ['#eee661', '#A7A7A7', '#A68F5D'];
            return (
              <View
                key={player.id}
                style={[styles.topItem, { backgroundColor: bgColors[player.position - 1] }]}>
                <ScoreboardRow
                  player={player}
                  textStyle={{ color: player.position === 1 ? '#718D80' : colors.text }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
