import { DisplayPlayer } from '@Src/global/playerInfoState';
import { getMedalWithRank } from '@Src/utils/medals';
import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle, Image } from 'react-native';

import Text from '../../Text';
import styles from './ScoreboardRowStyle';

type Props = {
  player: DisplayPlayer;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function PlayerRow({ player, containerStyle, textStyle }: Props) {
  const image = getMedalWithRank(player.rank);
  return (
    <View key={player.id} style={[styles.card, containerStyle]}>
      <Text fontSize="lg" style={textStyle}>
        {player.position}
      </Text>
      <Text fontSize="md" style={[styles.pseudo, textStyle]}>
        {player.name}
      </Text>
      {image && <Image source={image} style={{ width: 16, height: 23 }} />}
      <Text fontSize="md" style={[styles.score, textStyle]}>
        {player.score}
      </Text>
    </View>
  );
}
