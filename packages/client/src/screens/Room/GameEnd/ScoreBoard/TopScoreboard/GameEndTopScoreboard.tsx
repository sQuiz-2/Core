import TopRow from '@Src/components/ScoreBoard/TopRow';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import React from 'react';
import { View, Image, ScrollView } from 'react-native';

import useGameEndTopScoreboardStyle from './GameEndTopScoreboardStyle';

type GameEndTopScoreBoardProps = {
  players: DisplayPlayer[];
};

export default function GameEndTopScoreBoard({ players }: GameEndTopScoreBoardProps) {
  const styles = useGameEndTopScoreboardStyle();

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('@Assets/images/podium.png')} style={styles.image} />
      </View>
      <View style={styles.topContainer}>
        <ScrollView style={styles.scroll}>
          {players.map((player) => (
            <TopRow key={player.id} player={player} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
