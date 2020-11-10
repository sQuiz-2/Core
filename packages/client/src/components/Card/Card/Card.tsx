import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleProp, ViewStyle, View, ViewProps } from 'react-native';

import styles from './CardStyle';

interface CardProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export default function Card({ style, ...props }: CardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.cardContainter,
        { shadowColor: colors.border, backgroundColor: colors.card },
        style,
      ]}
      {...props}
    />
  );
}
