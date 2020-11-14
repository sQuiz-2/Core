import { ScoreboardRow } from '@Src/components/ScoreBoard';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Image, ScrollView } from 'react-native';

import useGameEndTopScoreboardStyle from './GameEndTopScoreboardStyle';

const players = [
  { id: 0, name: 'Xari', score: 90, position: 1 },
  { id: 0, name: 'M4gie', score: 90, position: 1 },
  { id: 0, name: 'Pod', score: 70, position: 2 },
  { id: 0, name: 'Khalis', score: 60, position: 3 },
  { id: 0, name: 'Khalis', score: 60, position: 3 },
];

export default function GameEndTopScoreBoard() {
  const { colors } = useTheme();
  const styles = useGameEndTopScoreboardStyle();

  return (
    <View>
      <View style={styles.imageContainer}>
        <Image source={require('@Assets/images/podium.png')} style={styles.image} />
      </View>
      <ScrollView style={styles.topContainer}>
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
  );
}
