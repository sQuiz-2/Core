import Text from '@Src/components/Text';
import { getMedalWithRank } from '@Src/utils/medals';
import React from 'react';
import { View, Image } from 'react-native';

import useRoundCounterStyle from './RoundCounterStyle';

type RoundCounterProps = {
  ranks: number[];
};

export default function RoundCounter({ ranks }: RoundCounterProps) {
  const styles = useRoundCounterStyle();

  return (
    <View style={styles.container}>
      {ranks.map((rank, value) => {
        const image = getMedalWithRank(rank);
        return (
          <Text key={value} fontSize="xl">
            {image ? <Image source={image} style={styles.medal} /> : <View style={styles.dot} />}
          </Text>
        );
      })}
    </View>
  );
}
