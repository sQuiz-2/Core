import Card from '@Src/components/Card';
import Scoreboard from '@Src/components/ScoreBoard';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import React from 'react';
import { View } from 'react-native';

import styles from './GameEndFullScoreboardStyle';

type GameEndFullScoreBoardProps = {
  players: DisplayPlayer[];
};

export default function GameEndFullScoreBoard({ players }: GameEndFullScoreBoardProps) {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.grow}>
          <Scoreboard players={players} />
        </View>
      </Card>
    </View>
  );
}
