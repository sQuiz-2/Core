import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

import Text from '../Text';
import CircularProgress from './CircularProgress';

type Props = {
  size: number;
  strokeWidth: number;
  time: number;
};

export default function Timer({ time, ...circularProgress }: Props) {
  const [textTime, setTextTime] = useState(0);
  const interval = useRef<null | NodeJS.Timeout>(null);
  const animatedTime = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedTime.setValue(0);
    setTextTime(time);
    AnimateCircle();
  }, [time]);

  function AnimateCircle() {
    Animated.timing(animatedTime, {
      toValue: 1,
      duration: time * 1000,
      useNativeDriver: false,
    }).start();
  }

  useEffect(() => {
    // Check if a counter is already created
    if (interval.current !== null) {
      if (textTime <= 0) {
        clearInterval(interval.current);
        interval.current = null;
      }
      return;
    }
    interval.current = setInterval(() => {
      setTextTime((textTime) => textTime - 1);
    }, 1 * 1000);
  }, [textTime]);

  return (
    <CircularProgress progress={animatedTime} {...circularProgress}>
      <Text fontSize="md">{textTime}</Text>
    </CircularProgress>
  );
}
