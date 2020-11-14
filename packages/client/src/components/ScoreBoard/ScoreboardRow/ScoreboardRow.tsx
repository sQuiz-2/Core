import { DisplayPlayer } from '@Src/global/playerInfoState';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';

import Text from '../../Text';
import styles from './ScoreboardRowStyle';

type Props = {
  player: DisplayPlayer;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function PlayerRow({ player, containerStyle, textStyle }: Props) {
  const { colors } = useTheme();
  return (
    <View key={player.id} style={[styles.card, containerStyle]}>
      <Text
        fontSize="lg"
        style={[styles.pseudo, { color: player.find ? 'gold' : colors.text }, textStyle]}>
        {player.position}
      </Text>
      <Text
        fontSize="md"
        style={[styles.pseudo, { color: player.find ? 'gold' : colors.text }, textStyle]}>
        {player.name}
      </Text>
      <Text
        fontSize="md"
        style={[styles.score, { color: player.find ? 'gold' : colors.text }, textStyle]}>
        {player.score}
      </Text>
    </View>
  );
}
