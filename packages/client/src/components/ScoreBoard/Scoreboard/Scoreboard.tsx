import scoreboardState from '@Src/global/Room/scoreboard';
import React from 'react';
import { ScrollView } from 'react-native';
import { useRecoilValue } from 'recoil';

import ScoreboardRow from '../ScoreboardRow';
import styles from './ScoreboardStyle';

type Props = {
  displayMedal?: boolean;
};

export default function Scoreboard({ displayMedal = true }: Props) {
  const players = useRecoilValue(scoreboardState);
  return (
    <ScrollView style={styles.container}>
      {players.map((player) => (
        <ScoreboardRow
          player={player}
          key={player.id}
          containerStyle={styles.row}
          displayMedal={displayMedal}
        />
      ))}
    </ScrollView>
  );
}
