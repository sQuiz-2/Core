import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useRecoilValue, useRecoilState } from 'recoil';

import timerState from '../global/timerState';
import Text from './Text';

export default function Timer() {
  /*   const timer = useRecoilValue(msTimerState);
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
          backgroundColor: colors.primary,
          borderColor: colors.text,
        },
      ]}
    />
  ); */

  const [time, setTime] = useRecoilState(timerState);
  const interval = useRef<null | NodeJS.Timeout>(null);

  useEffect(() => {
    // Check if a counter is already created
    if (interval.current !== null) {
      if (time <= 0) {
        clearInterval(interval.current);
        interval.current = null;
      }
      return;
    }
    interval.current = setInterval(() => {
      setTime((time) => time - 1);
    }, 1 * 1000);
  }, [time]);

  return (
    <Text fontFamily="title" fontSize="xxl">
      {time}
    </Text>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: 15,
    borderWidth: 2,
  },
});
