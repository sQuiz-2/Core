import { DisplayPlayer } from '@Src/global/playerInfoState';
import React, { useState } from 'react';
import { View } from 'react-native';

import GameEndFullScoreboard from '../FullScoreboard';
import GameEndScoreboardSwitch from '../ScoreboardSwitch';
import GameEndTopScoreBoard from '../TopScoreboard/';
import styles from './GameEndScoreboardStyle';

type GameEndScoreBoardProps = {
  players: DisplayPlayer[];
};

export default function GameEndScoreBoard({ players }: GameEndScoreBoardProps) {
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
