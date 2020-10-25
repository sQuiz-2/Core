import { useTheme } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity, Image } from 'react-native';

import Text from '../Text';
import Card from './Card';

type ButtonProps = {
  title: string;
  players: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (id?: any) => void;
};

export default function GameCard({ style, ...props }: ButtonProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card style={styles.gameCard}>
        <LinearGradient colors={['#a8e063', '#56ab2f']} style={styles.content}>
          <Text style={[{ color: colors.text }, styles.title]} fontFamily="title" fontSize="xxl">
            {props.title.toUpperCase()}
          </Text>
          <Text style={[{ color: colors.text }]} fontFamily="text" fontSize="md">
            {props.players} joueur{props.players > 1 && 's'}
          </Text>
          <Image source={require('../../../assets/images/question.png')} style={[styles.image]} />
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  gameCard: {
    margin: 5,
    padding: 0,
    width: 250,
  },
  content: {
    paddingLeft: 20,
    paddingTop: 10,
    borderRadius: 10,
    position: 'relative',
    height: 130,
  },
  title: {
    fontWeight: '600',
  },
  image: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 77,
    height: 66,
  },
});
