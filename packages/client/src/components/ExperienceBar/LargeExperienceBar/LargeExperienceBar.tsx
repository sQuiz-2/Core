import ProgressBar from '@Src/components/ProgressBar';
import Text from '@Src/components/Text';
import React from 'react';
import { View } from 'react-native';

import styles from './LargeExperienceBarStyle';

type LargeExperienceBarProps = {
  experience: number;
};

export default function LargeExperienceBar({ experience }: LargeExperienceBarProps) {
  const { level, nextLevelExp, currentLevelExp } = computeLevel(experience);

  function computeLevel(experience: number) {
    let exp = 10;
    let level = 0;
    let currentLevelExp = 0;
    for (; exp <= experience; level++, exp += level * 10) {
      currentLevelExp = exp;
    }
    return { level, currentLevelExp, nextLevelExp: exp };
  }

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
