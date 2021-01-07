import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleProp, ViewStyle, TouchableOpacity, Image, View } from 'react-native';

import Text from '../../Text';
import Card from '../Card';
import useGameCardStyle from './GameCardStyle';

type ButtonProps = {
  color: [string, string];
  name: string;
  players: number;
  isFull: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (id?: any) => void;
};

export default function GameCard({ style, ...props }: ButtonProps) {
  const { players, isFull, name, color, onPress } = props;
  const styles = useGameCardStyle();
  const { colors } = useTheme();
  const onlinePlayers = isFull
    ? 'Le salon est plein !'
    : `${players > 0 ? players : 'Aucun'} joueur${players > 1 ? 's' : ''}`;

  const card = (
    <Card style={styles.gameCard}>
      <LinearGradient
        colors={isFull ? ['#BBBBBB', '#555555'] : color}
        style={styles.content}
        start={[1.0, 0.0]}
        end={[0.0, 1.0]}>
        <Text style={[{ color: colors.text }, styles.title]} fontFamily="title" fontSize="xxl">
          {name.toUpperCase()}
        </Text>
        <Text style={[{ color: colors.text }]} fontFamily="text" fontSize="md">
          {onlinePlayers}
        </Text>
        <Image source={require('@Assets/images/question.png')} style={[styles.image]} />
      </LinearGradient>
    </Card>
  );

  if (isFull) {
    return <View style={styles.container}>{card}</View>;
  } else {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        {card}
      </TouchableOpacity>
    );
  }
}
