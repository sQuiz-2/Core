import { DisplayPlayer } from '@Src/global/playerInfoState';
import React, { useState } from 'react';
import { View } from 'react-native';

import GameEndFullScoreboard from '../FullScoreboard';
import GameEndScoreboardSwitch from '../ScoreboardSwitch';
import GameEndTopScoreBoard from '../TopScoreboard/';
import styles from './GameEndScoreboardStyle';

const players: DisplayPlayer[] = [
  { id: '0', name: 'Xari', score: 90, position: 1, avatar: 0, find: false },
  { id: '1', name: 'Pod', score: 70, position: 2, avatar: 0, find: false },
  { id: '2', name: 'Khalis', score: 60, position: 3, avatar: 0, find: false },
];

export default function GameEndScoreBoard() {
  const [displayTop, setDisplayTop] = useState(true);
  const topPlayers = players.filter((player) => player.position < 4);

  return (
    <View style={styles.container}>
      <GameEndScoreboardSwitch displayTop={displayTop} setDisplayTop={setDisplayTop} />
      {displayTop ? (
        <GameEndTopScoreBoard players={topPlayers} />
      ) : (
        <GameEndFullScoreboard players={players} />
      )}
    </View>
  );
}
