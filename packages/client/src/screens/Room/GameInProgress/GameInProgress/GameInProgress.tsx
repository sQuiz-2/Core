import Card from '@Src/components/Card/Card';
import { ResponsiveContainer } from '@Src/components/Containers';
import PlayerInfos from '@Src/components/PlayerInfo';
import React from 'react';
import { View } from 'react-native';

import GameInput from '../GameInput';
import Question from '../Question';
import RoomTitle from '../RoomTitle';
import RoundCounter from '../RoundCounter';
import RoundEnd from '../RoundEnd';
import Scoreboard from '../Scoreboard';
import useGameInProgressStyle from './GameInProgressStyle';

export default function GameInProgress() {
  const styles = useGameInProgressStyle();

  return (
    <ResponsiveContainer>
      <View style={styles.info}>
        <Card style={styles.card}>
          <RoomTitle />
        </Card>
        <Card style={[styles.card, styles.grow, styles.scoreboard]}>
          <Scoreboard />
        </Card>
        <Card>
          <PlayerInfos />
        </Card>
      </View>
      <View style={styles.game}>
        <View style={styles.grow}>
          <Question />
          <RoundEnd />
        </View>
        <RoundCounter />
        <GameInput />
      </View>
    </ResponsiveContainer>
  );
}
