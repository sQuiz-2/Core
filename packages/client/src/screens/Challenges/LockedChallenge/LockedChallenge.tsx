import Text from '@Src/components/Text';
import React from 'react';
import { View, Image } from 'react-native';

import useLockedChallengeStyle from './LockedChallengeStyle';

const trophyImage = require('@Assets/images/trophy.png');

export default function LockedChallenge({
  lock = false,
  title,
  description,
}: {
  lock?: boolean;
  title: string;
  description: string;
}) {
  const styles = useLockedChallengeStyle();

  return (
    <View style={styles.container}>
      {lock && <Image source={trophyImage} style={[styles.pictureWidth, styles.pictureGray]} />}
      <Image
        source={trophyImage}
        style={[styles.pictureWidth, lock && styles.pictureAbsolute, lock && styles.opacity]}
      />
      <View style={styles.textContainer}>
        <Text fontSize="sm" style={styles.bold}>
          {title}
        </Text>
        <Text fontSize="sm" style={styles.italic}>
          {description}
        </Text>
      </View>
    </View>
  );
}
