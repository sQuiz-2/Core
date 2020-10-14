import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useRecoilValue } from 'recoil';

import { msTimerState } from '../global/timerState';

export default function Timer() {
  const timer = useRecoilValue(msTimerState);
  const [progress, setProgress] = useState(new Animated.Value(0));
  const { colors } = useTheme();

  useEffect(() => {
    setProgress(new Animated.Value(0));
  }, [timer]);

  Animated.timing(progress, {
    toValue: 100,
    duration: timer,
    useNativeDriver: false,
  }).start();

  return (
    <Animated.View
      style={[
        styles.progressBar,
        {
          width: progress.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
          backgroundColor: colors.accent,
          borderColor: colors.text,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: 15,
    borderWidth: 2,
  },
});
