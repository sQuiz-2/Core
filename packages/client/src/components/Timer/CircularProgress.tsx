import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;

interface CircularPogressProps {
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
}: CircularPogressProps) {
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleSvg: {
    position: 'absolute',
    transform: [{ rotateZ: '-90deg' }], // Start the opening of the circle at the top
  },
});
