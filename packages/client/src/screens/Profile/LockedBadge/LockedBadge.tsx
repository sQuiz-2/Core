import Badge from '@Src/components/Badge';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Pressable } from 'react-native';

import styles from './LockedBadgeStyle';

export default function LockedBadge({
  selected = false,
  lock = false,
  onPress,
  name,
  id,
  lockedDescription,
}: {
  lock?: boolean;
  selected?: boolean;
  onPress: (avatar: string) => void;
  name: string;
  id: string;
  lockedDescription?: string;
}) {
  const { colors } = useTheme();

  if (lock) {
    return (
      <View style={styles.containerStyle}>
        <Badge
          locked
          badgeName={name}
          id={id}
          imageStyle={styles.pictureWidth}
          overForInfo={false}
          lockedDescription={lockedDescription}
        />
      </View>
    );
  }
  return (
    <Pressable
      onPress={() => onPress(id)}
      style={[
        styles.containerStyle,
        {
          backgroundColor: selected ? colors.notification : 'none',
        },
      ]}>
      <Badge badgeName={name} id={id} imageStyle={styles.pictureWidth} overForInfo={false} />
    </Pressable>
  );
}
