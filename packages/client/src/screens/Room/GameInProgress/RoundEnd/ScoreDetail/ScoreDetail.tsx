import Text from '@Src/components/Text';
import { EmitScoreDetails } from '@squiz/shared';
import React from 'react';
import { View, Image } from 'react-native';

import useScoreDetailStyle from './ScoreDetailStyle';

type ScoreDetailProps = {
  scoreDetail: EmitScoreDetails;
};

export default function ScoreDetail({ scoreDetail }: ScoreDetailProps) {
  const styles = useScoreDetailStyle();

  return (
    <View style={styles.scoreDetails}>
      <Image source={require('@Assets/images/chest.png')} style={styles.image} />
      <View>
        <Text fontSize="lg" style={styles.scoreText}>
          +5 points
        </Text>
        <Text fontSize="lg" style={styles.scoreText}>
          +{scoreDetail.streak} combo
        </Text>
        <Text fontSize="lg" style={styles.scoreText}>
          +{scoreDetail.position} position
        </Text>
      </View>
    </View>
  );
}
