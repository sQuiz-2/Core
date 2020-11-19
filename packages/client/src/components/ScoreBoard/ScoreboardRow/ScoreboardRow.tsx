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
  displayMedal?: boolean;
};

export default function PlayerRow({
  player,
  containerStyle,
  textStyle,
  displayMedal = true,
}: Props) {
  const image = getMedalWithRank(player.rank);
  return (
    <View style={[styles.card, containerStyle]}>
      <View style={styles.infoContainer}>
        <Text fontSize="lg" style={textStyle}>
          {player.position}
        </Text>
        <Text fontSize="md" style={[styles.pseudo, textStyle]}>
          {player.name}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        {displayMedal && image && <Image source={image} style={styles.medal} />}
        <Text fontSize="md" style={[styles.score, textStyle]}>
          {player.score}
        </Text>
      </View>
    </View>
  );
}
