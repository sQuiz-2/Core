import Text from '@Src/components/Text';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { computeLevel } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';

import useLevelStyle from './LevelStyle';

type LargeExperienceBarProps = {
  experience: number;
};

export default function Level({ experience }: LargeExperienceBarProps) {
  const styles = useLevelStyle();
  const { level } = computeLevel(experience);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <FontAwesome5 name="certificate" size={24} color={colors.border} />
      <Text fontSize="sm" style={styles.text}>
        {level}
      </Text>
    </View>
  );
}
