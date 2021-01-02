import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Animated, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import styles from './CircularProgressStyle';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;

interface CircularProgressProps {
  progress: Animated.Value;
  children?: React.ReactNode;
  size: number;
  strokeWidth?: number;
}

export default function CircularProgress({
  progress,
  children,
  size,
  strokeWidth = 5,
}: CircularProgressProps) {
  const { colors } = useTheme();
  const radius = (size - strokeWidth) / 2;
  const x = size / 2;
  const y = size / 2;
  const circumference = radius * 2 * PI;

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, radius * 2 * PI],
  });

  return (
    <View style={[styles.container, { width: size }]}>
      {children}
      <Svg width={size} height={size} style={styles.circleSvg}>
        <Circle
          stroke={colors.border}
          fill="none"
          {...{
            strokeWidth,
            cx: x,
            cy: y,
            r: radius,
          }}
        />
        <AnimatedCircle
          stroke={colors.text}
          fill="none"
          strokeDasharray={`${circumference}, ${circumference}`}
          {...{
            strokeWidth,
            strokeDashoffset,
            cx: x,
            cy: y,
            r: radius,
          }}
        />
      </Svg>
    </View>
  );
}
