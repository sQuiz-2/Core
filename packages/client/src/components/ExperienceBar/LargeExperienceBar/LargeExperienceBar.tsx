import ProgressBar from '@Src/components/ProgressBar';
import Text from '@Src/components/Text';
import { computeLevel } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';

import styles from './LargeExperienceBarStyle';

type LargeExperienceBarProps = {
  experience: number;
};

export default function LargeExperienceBar({ experience }: LargeExperienceBarProps) {
  const { level, nextLevelExp, currentLevelExp } = computeLevel(experience);

  return (
    <View>
      <View style={styles.infos}>
        <Text style={styles.text}>Niveau {level}</Text>
        <Text style={styles.text}>
          {experience}/{nextLevelExp}
        </Text>
      </View>
      <ProgressBar min={currentLevelExp} max={nextLevelExp} progress={experience} />
    </View>
  );
}
