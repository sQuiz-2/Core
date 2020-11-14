import { DisplayPlayer } from '@Src/global/playerInfoState';
import React from 'react';
import { ScrollView } from 'react-native';

import ScoreboardRow from '../ScoreboardRow';
import styles from './ScoreboardStyle';

type Props = {
  players: DisplayPlayer[];
};

export default function Scoreboard({ players }: Props) {
  return (
    <ScrollView style={styles.container}>
      {players.map((player) => (
        <ScoreboardRow player={player} key={player.id} />
      ))}
    </ScrollView>
  );
}
