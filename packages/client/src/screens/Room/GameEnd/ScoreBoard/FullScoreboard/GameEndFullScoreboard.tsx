import Card from '@Src/components/Card';
import Scoreboard from '@Src/components/ScoreBoard';
import React from 'react';
import { View } from 'react-native';

import styles from './GameEndFullScoreboardStyle';

export default function GameEndFullScoreBoard() {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.grow}>
          <Scoreboard displayMedal={false} />
        </View>
      </Card>
    </View>
  );
}
