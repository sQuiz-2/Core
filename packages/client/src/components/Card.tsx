import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TouchableOpacity } from 'react-native';

import Text from '../components/Text';

type ButtonProps = {
  title: string;
  players: number;
  style?: StyleProp<ViewStyle>;
  onPress?: (id?: any) => void;
};

export default function Card({ style, ...props }: ButtonProps) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity style={styles.cardContainter} onPress={props.onPress}>
      <Text style={[{ color: colors.primary }, styles.title]} fontFamily="title" fontSize="lg">
        {props.title.toUpperCase()}
      </Text>
      <Text style={[{ color: colors.primary }]} fontFamily="text" fontSize="md">
        {props.players} joueur{props.players > 1 && 's'}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainter: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    width: 200,
    padding: 20,
    margin: 5,
  },
  title: {
    paddingTop: 10,
    textAlign: 'center',
    paddingBottom: 10,
  },
});
