import Text from '@Src/components/Text';
import { trophies } from '@Src/utils/loadTrophies';
import React from 'react';
import { View, Image } from 'react-native';

import useLockedChallengeStyle from './LockedChallengeStyle';

export default function LockedChallenge({
  lock = false,
  title,
  description,
  customPicture = false,
}: {
  lock?: boolean;
  title: string;
  description: string;
  customPicture?: boolean;
}) {
  const styles = useLockedChallengeStyle();
  const image = trophies[customPicture ? 'april2022' : 'trophy'];
  const imageStyle = customPicture
    ? {
        width: 42,
        height: 42,
      }
    : styles.pictureWidth;

  return (
    <View style={styles.container}>
      {lock && <Image source={image} style={[imageStyle, styles.pictureGray]} />}
      {!lock && (
        <Image
          source={image}
          style={[imageStyle, lock && styles.pictureAbsolute, lock && styles.opacity]}
        />
      )}
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
