import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import styles from './LifeStyle';

type LifeProps = {
  life: number;
};

export default function Life({ life }: LifeProps) {
  const { colors } = useTheme();
  const displayLife = [];
  for (let i = 0; i < life; i++) {
    displayLife.push(<FontAwesome key={i} name="heart" size={10} color={colors.text} />);
  }
  return <View style={styles.container}>{displayLife}</View>;
}
