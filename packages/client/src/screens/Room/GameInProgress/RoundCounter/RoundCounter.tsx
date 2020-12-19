import Text from '@Src/components/Text';
import { useRoomListener } from '@Src/utils/hooks/roomListener';
import { getMedalWithRank } from '@Src/utils/medals';
import { GameEvent, GameRank, EmitRanks } from '@squiz/shared';
import React from 'react';
import { View, Image } from 'react-native';

import useRoundCounterStyle from './RoundCounterStyle';

export default function RoundCounter() {
  const styles = useRoundCounterStyle();
  const ranks: EmitRanks = useRoomListener(GameEvent.Ranks, Array(15).fill(GameRank.RoundComing));
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
