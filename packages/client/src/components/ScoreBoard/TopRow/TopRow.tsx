import { DisplayPlayer } from '@Src/global/playerInfoState';
import { useTheme } from '@react-navigation/native';
import { TopTimeAnswer } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';

import ScoreboardRow from '../ScoreboardRow';
import styles from './TopRowStyle';

const bgColors = ['#eee661', '#A7A7A7', '#A68F5D'];

type TopRowProps = {
  player: DisplayPlayer | TopTimeAnswer;
};

export default function TopRow({ player }: TopRowProps) {
  const { colors } = useTheme();
  return (
    <View
      key={player.id}
      style={[styles.topItem, { backgroundColor: bgColors[player.position - 1] }]}>
      <ScoreboardRow
        player={player}
        textStyle={{ color: player.position === 1 ? '#718D80' : colors.text }}
        displayMedal={false}
      />
    </View>
  );
}
