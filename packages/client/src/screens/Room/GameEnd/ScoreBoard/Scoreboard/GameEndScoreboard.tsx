import React, { useState } from 'react';
import { View } from 'react-native';

import GameEndFullScoreboard from '../FullScoreboard';
import GameEndScoreboardSwitch from '../ScoreboardSwitch';
import GameEndTopScoreBoard from '../TopScoreboard/';
import styles from './GameEndScoreboardStyle';

export default function GameEndScoreBoard() {
  const [displayTop, setDisplayTop] = useState(true);

  return (
    <View style={styles.container}>
      <GameEndScoreboardSwitch displayTop={displayTop} setDisplayTop={setDisplayTop} />
      {displayTop ? <GameEndTopScoreBoard /> : <GameEndFullScoreboard />}
    </View>
  );
}
