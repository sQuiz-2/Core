import { DisplayPlayer } from '@Src/global/playerInfoState';
import avatars from '@Src/utils/loadAvatars';
import { getMedalWithRank } from '@Src/utils/medals';
import { GameRank, TopTimeAnswer } from '@squiz/shared';
import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle, Image } from 'react-native';

import Text from '../../Text';
import styles from './ScoreboardRowStyle';

type Props = {
  player: DisplayPlayer | TopTimeAnswer;
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
  //@ts-ignore
  const image = player?.rank > GameRank.NotAnswered ? getMedalWithRank(player.rank) : null;
  return (
    <View style={[styles.card, containerStyle]}>
      <View style={styles.infoContainer}>
        <Text fontSize="xl" style={[textStyle, styles.bold]}>
          {player.position}
        </Text>
        <Image source={avatars[player.avatar as keyof typeof avatars]} style={styles.avatar} />
        <Text fontSize="lg" style={textStyle}>
          {player.name}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        {displayMedal && image && <Image source={image} style={styles.medal} />}
        <Text fontSize="lg" style={[styles.score, textStyle]}>
          {player.score}
        </Text>
      </View>
    </View>
  );
}
