import React from 'react';
import { View } from 'react-native';

import Card from '../Card/Card';
import { ResponsiveContainer } from '../Containers';
import GameInput from '../GameInput';
import { QuizMainScreen } from '../GameMainScreen/';
import RoundCounter from '../GameMainScreen/GameStatus/RoundCounter';
import PlayerInfos from '../PlayerInfo';
import RoomTitle from '../RoomTitle';
import { ScoreBoard } from '../ScoreBoard';
import useQuizContainerStyle from './QuizContainerStyle';

export default function QuizContainer() {
  const styles = useQuizContainerStyle();
  return (
    <ResponsiveContainer>
      <View style={styles.info}>
        <Card style={styles.card}>
          <RoomTitle />
        </Card>
        <Card style={[styles.card, styles.grow]}>
          <ScoreBoard />
        </Card>
        <Card>
          <PlayerInfos />
        </Card>
      </View>
      <View style={styles.game}>
        <View style={styles.grow}>
          <QuizMainScreen />
        </View>
        <RoundCounter />
        <GameInput />
      </View>
    </ResponsiveContainer>
  );
}
