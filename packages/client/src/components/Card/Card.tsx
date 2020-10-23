import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, ViewProps } from 'react-native';

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

const styles = StyleSheet.create({
  cardContainter: {
    borderRadius: 10,
    padding: 20,
    margin: 5,
    shadowOffset: { width: 0, height: 8 },
  },
});
