import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleProp, ViewStyle, TouchableOpacity, Image } from 'react-native';

import Text from '../../Text';
import Card from '../Card';
import useGameCardStyle from './GameCardStyle';

type ButtonProps = {
  color: [string, string];
  name: string;
  players: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (id?: any) => void;
};

export default function GameCard({ style, ...props }: ButtonProps) {
  const styles = useGameCardStyle();
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Card style={styles.gameCard}>
        <LinearGradient
          colors={props.color}
          style={styles.content}
          start={[1.0, 0.0]}
          end={[0.0, 1.0]}>
          <Text style={[{ color: colors.text }, styles.title]} fontFamily="title" fontSize="xxl">
            {props.name.toUpperCase()}
          </Text>
          <Text style={[{ color: colors.text }]} fontFamily="text" fontSize="md">
            {(props.players > 0 && props.players) || 'Aucun'} joueur{props.players > 1 && 's'}
          </Text>
          <Image source={require('@Assets/images/question.png')} style={[styles.image]} />
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );
}
