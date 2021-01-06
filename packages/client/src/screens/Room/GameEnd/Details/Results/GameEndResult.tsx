import Card from '@Src/components/Card';
import Text from '@Src/components/Text';
import Timer from '@Src/components/Timer';
import onlinePlayersState from '@Src/global/Room/onlinePlayers';
import playerScoreState from '@Src/global/Room/playerScore';
import { GameTime } from '@squiz/shared';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import styles from './GameEndResultStyle';

export default function RoomGameEndResult() {
  const player = useRecoilValue(playerScoreState);
  const onlinePlayers = useRecoilValue(onlinePlayersState);

  if (!player) return null;
  return (
    <Card style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title} fontFamily="title" fontSize="xxl">
          RÉSULTATS
        </Text>
        <Timer time={GameTime.End} size={40} strokeWidth={3} />
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View style={styles.positionContainer}>
            <Text fontSize="xxl">{player.position}</Text>
            <Text fontSize="xl">{player.position === 1 ? 'er' : 'ème'}</Text>
          </View>
          <Text fontSize="xl">
            /{onlinePlayers} joueur{onlinePlayers > 1 && 's'}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text fontSize="xxl">{player.score} </Text>
          <Text fontSize="xl">point{player.score > 1 && 's'}</Text>
        </View>
      </View>
    </Card>
  );
}
