import Card from '@Src/components/Card';
import Text from '@Src/components/Text';
import { Timer } from '@Src/components/Timer';
import React from 'react';
import { View } from 'react-native';

import styles from './GameEndResultStyle';

type RoomGameEndResultProps = {
  score: number;
  position: number;
  players: number;
};

export default function RoomGameEndResult({ score, position, players }: RoomGameEndResultProps) {
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
            <Text fontSize="xxl">{position}</Text>
            <Text fontSize="xl">{position === 1 ? 'er' : 'ème'}</Text>
          </View>
          <Text fontSize="xl">
            /{players} joueur{players > 1 && 's'}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text fontSize="xxl">{score} </Text>
          <Text fontSize="xl">point{score > 1 && 's'}</Text>
        </View>
      </View>
    </Card>
  );
}
