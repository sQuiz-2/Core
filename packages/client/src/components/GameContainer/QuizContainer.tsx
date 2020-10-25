import React from 'react';
import { View, StyleSheet } from 'react-native';

import Card from '../Card/Card';
import Footer from '../Footer';
import { QuizMainScreen } from '../GameMainScreen/';
import RoundCounter from '../GameMainScreen/GameStatus/RoundCounter';
import PlayerInfos from '../PlayerInfo';
import RoomTitle from '../RoomTitle';
import { ScoreBoard } from '../ScoreBoard';
/* import GameInput from '../GameInput';
 */
import Text from '../Text';

export default function QuizContainer() {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.info}>
          <Card style={styles.card}>
            <RoomTitle />
          </Card>
          <Card style={[styles.card, { flexGrow: 1 }]}>
            <ScoreBoard />
          </Card>
          <Card>
            <PlayerInfos />
          </Card>
        </View>
        <View style={styles.game}>
          <View style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
            <Text fontFamily="text" fontSize="xxl">
              <QuizMainScreen />
            </Text>
          </View>
          <RoundCounter />
          <Card>
            <Text>Input</Text>
          </Card>
        </View>
      </View>
      <Footer enable />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 30,
    flexGrow: 1,
  },
  card: {
    marginBottom: 25,
  },
  info: {
    flexGrow: 1,
    width: '40%',
  },
  game: {
    flexGrow: 1,
    justifyContent: 'space-between',
    width: '60%',
    marginLeft: 20,
  },
});
