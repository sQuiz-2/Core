import React from 'react';
import { View } from 'react-native';

import Text from '../Text';
import useProgressBarStyle from './ProgressBarStyle';

type ProgressBarProps = {
  min?: number;
  max: number;
  progress: number;
};

export default function ProgressBar({ progress, min = 0, max }: ProgressBarProps) {
  const styles = useProgressBarStyle();

  const total = max - min;
  const progressPercent = ((progress - min) / total) * 100;

  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progress, { width: `${progressPercent}%` }]}>
        {progressPercent > 10 && (
          <Text style={styles.progressText}>{Math.floor(progressPercent)}%</Text>
        )}
      </View>
    </View>
  );
}
