import Text from '@Src/components/Text';
import { useSocketListener } from '@Src/utils/hooks/socketListener';
import { getMedalWithRank } from '@Src/utils/medals';
import React from 'react';
import { View, Image } from 'react-native';
import { GameEvent, GameRank } from 'shared/src/enums/Game';
import { EmitRanks } from 'shared/src/typings/Room';

import useRoundCounterStyle from './RoundCounterStyle';

export default function RoundCounter() {
  const styles = useRoundCounterStyle();
  const ranks: EmitRanks = useSocketListener(GameEvent.Ranks, Array(15).fill(GameRank.RoundComing));
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
