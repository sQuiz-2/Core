import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useScreenWidth } from '../../utils/hooks/screenWidth';
import GameInput from '../GameInput';
import { QuizMainScreen } from '../GameMainScreen/';
import RoundCounter from '../GameMainScreen/GameStatus/RoundCounter';
import { ScoreBoard } from '../ScoreBoard';

export default function QuizContainer() {
  const { colors } = useTheme();
  const isLargeScreen = useScreenWidth();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.primary },
        isLargeScreen && { flexDirection: 'row' },
      ]}>
      {!isLargeScreen && <QuizMainScreen />}
      <ScoreBoard />
      {isLargeScreen ? (
        <>
          <View style={styles.gameContainer}>
            <RoundCounter />
            <View style={styles.info}>
              <QuizMainScreen />
            </View>
            <GameInput />
          </View>
        </>
      ) : (
        <GameInput />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gameContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});
