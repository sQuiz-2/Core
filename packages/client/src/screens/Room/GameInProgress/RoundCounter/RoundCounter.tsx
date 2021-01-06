import Text from '@Src/components/Text';
import playerRankState from '@Src/global/Room/playerRanks';
import { getMedalWithRank } from '@Src/utils/medals';
import React from 'react';
import { View, Image } from 'react-native';
import { useRecoilValue } from 'recoil';

import useRoundCounterStyle from './RoundCounterStyle';

export default function RoundCounter() {
  const styles = useRoundCounterStyle();
  const ranks = useRecoilValue(playerRankState);

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
