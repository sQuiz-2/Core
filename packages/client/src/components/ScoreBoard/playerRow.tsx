import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import { DisplayPlayer } from '../../global/playerInfoState';
import Text from '../Text';

type Props = {
  player: DisplayPlayer;
};

export default function PlayerRow({ player }: Props) {
  const { colors } = useTheme();
  return (
    <View key={player.id} style={[styles.card]}>
      <Text fontSize="lg" style={[styles.pseudo, { color: player.find ? 'gold' : colors.text }]}>
        {player.position}
      </Text>
      <Text fontSize="md" style={[styles.pseudo, { color: player.find ? 'gold' : colors.text }]}>
        {player.name}
      </Text>
      <Text
        fontSize="md"
        fontFamily="title"
        style={[styles.score, { color: player.find ? 'gold' : colors.text }]}>
        {player.score}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 50,
  },
  pseudo: {
    paddingLeft: 10,
  },
  score: {
    marginLeft: 'auto',
  },
});
