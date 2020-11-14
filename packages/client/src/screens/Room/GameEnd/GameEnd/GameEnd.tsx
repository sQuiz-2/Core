import { ResponsiveContainer } from '@Src/components/Containers';
import React from 'react';
import { View } from 'react-native';

import GameEndQuestion from '../Details/Questions';
import RoomGameEndResult from '../Details/Results';
import GameEndScoreBoard from '../ScoreBoard';
import useGameEndStyle from './GameEndStyle';

export default function RoomGameEndContainer() {
  const styles = useGameEndStyle();
  return (
    <ResponsiveContainer style={styles.container}>
      <View style={styles.scoreboard}>
        <GameEndScoreBoard />
      </View>
      <View style={styles.details}>
        <RoomGameEndResult players={10} score={42} position={1} />
        <GameEndQuestion />
      </View>
    </ResponsiveContainer>
  );
}
