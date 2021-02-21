import Text from '@Src/components/Text';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Image, Pressable } from 'react-native';

import styles from './LockedAvatarStyle';

export default function LockedAvatar({
  image,
  selected = false,
  lock = false,
  onPress,
  name,
  lockText,
}: {
  image: any;
  lock?: boolean;
  selected?: boolean;
  onPress: (avatar: string) => void;
  name: string;
  lockText: string;
}) {
  const { colors } = useTheme();

  if (lock) {
    return (
      <View style={styles.containerStyle}>
        <Image source={image} style={[styles.pictureWidth, styles.pictureGray]} />
        <Image
          source={image}
          style={[styles.pictureWidth, styles.pictureAbsolute, styles.opacity]}
        />
        <View style={[styles.absolute, styles.center]}>
          <Text>{lockText}</Text>
        </View>
      </View>
    );
  }
  return (
    <Pressable
      onPress={() => onPress(name)}
      style={[
        styles.containerStyle,
        {
          backgroundColor: selected ? colors.notification : 'none',
        },
      ]}>
      <Image source={image} style={styles.pictureWidth} />
    </Pressable>
  );
}
