import Card from '@Src/components/Card';
import Text from '@Src/components/Text';
import { Timer } from '@Src/components/Timer';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import useGetPlayer from '@Src/utils/hooks/getPlayer';
import React from 'react';
import { View } from 'react-native';

import styles from './GameEndResultStyle';

type RoomGameEndResultProps = {
  players: DisplayPlayer[];
};

export default function RoomGameEndResult({ players }: RoomGameEndResultProps) {
  const player = useGetPlayer(players);

  if (!player) return null;
  return (
    <Card style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.title} fontFamily="title" fontSize="xxl">
          RÉSULTATS
        </Text>
        <Timer time={20} size={40} strokeWidth={3} />
      </View>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View style={styles.positionContainer}>
            <Text fontSize="xxl">{player.position}</Text>
            <Text fontSize="xl">{player.position === 1 ? 'er' : 'ème'}</Text>
          </View>
          <Text fontSize="xl">
            /{players.length} joueur{players.length > 1 && 's'}
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
