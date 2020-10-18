import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useScreenWidth } from '../../utils/hooks/screenWidth';
import ScoreBoardContent from './ScoreBoardContent';

export default function ScoreBoard() {
  const isLargeScreen = useScreenWidth();
  const { colors } = useTheme();
  let boardStyle;

  if (isLargeScreen) {
    boardStyle = { minWidth: 350, maxWidth: 350 };
  } else {
    boardStyle = { flex: 1 };
  }
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.primary,
        },
        boardStyle,
      ]}>
      <ScoreBoardContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
