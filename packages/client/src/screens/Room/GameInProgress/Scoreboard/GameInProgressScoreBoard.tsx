import Scoreboard from '@Src/components/ScoreBoard';
import Text from '@Src/components/Text';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import React from 'react';
import { View } from 'react-native';

import styles from './GameInProgressScoreboardStyle';

type ScoreBoardProps = {
  players: DisplayPlayer[];
};

export default function ScoreBoard({ players }: ScoreBoardProps) {
  return (
    <>
      <View style={styles.top}>
        <Text fontFamily="title" fontSize="xxl">
          JOUEURS
        </Text>
        <Text fontFamily="title" fontSize="xxl">
          {players.length}
        </Text>
      </View>
      <View style={styles.grow}>
        <Scoreboard players={players} />
      </View>
    </>
  );
}
