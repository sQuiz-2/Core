import bronze from '@Assets/images/medals/bronze.png';
import gold from '@Assets/images/medals/gold.png';
import gray from '@Assets/images/medals/gray.png';
import green from '@Assets/images/medals/green.png';
import silver from '@Assets/images/medals/silver.png';
import Text from '@Src/components/Text';
import { useSocketListener } from '@Src/utils/hooks/socketListener';
import React from 'react';
import { View, Image } from 'react-native';
import { GameEvent, GameRank } from 'shared/src/enums/Game';
import { EmitRanks } from 'shared/src/typings/Room';

import useRoundCounterStyle from './RoundCounterStyle';

export default function RoundCounter() {
  const styles = useRoundCounterStyle();
  const ranks: EmitRanks = useSocketListener(GameEvent.Ranks, Array(15).fill(GameRank.RoundComing));
  const images = [gray, gold, silver, bronze];
  return (
    <View style={styles.container}>
      {ranks.map((rank, value) => {
        let image;
        if (rank >= GameRank.NotAnswered && rank <= GameRank.Third) {
          image = images[rank];
        } else if (rank > GameRank.Third) {
          image = green;
        }
        return (
          <Text key={value} fontSize="xl">
            {image ? (
              <Image source={image} style={{ width: 19, height: 27 }} />
            ) : (
              <View style={styles.dot} />
            )}
          </Text>
        );
      })}
    </View>
  );
}
