import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import styles from './LifeStyle';

type LifeProps = {
  lifes: number;
};

export default function Life({ lifes }: LifeProps) {
  const { colors } = useTheme();
  const displayLifes = [];
  for (let i = 0; i < lifes; i++) {
    displayLifes.push(<FontAwesome key={i} name="heart" size={10} color={colors.text} />);
  }
  return <View style={styles.container}>{displayLifes}</View>;
}
