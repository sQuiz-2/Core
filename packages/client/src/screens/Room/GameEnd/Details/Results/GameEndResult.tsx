import Card from '@Src/components/Card';
import { LargeExperienceBar } from '@Src/components/ExperienceBar';
import Text from '@Src/components/Text';
import Timer from '@Src/components/Timer';
import onlinePlayersState from '@Src/global/Room/onlinePlayers';
import playerScoreState from '@Src/global/Room/playerScore';
import roomInfosState from '@Src/global/Room/roomInfos';
import userBasicInfoState from '@Src/global/userBasicInfos';
import { GameTime, Player } from '@squiz/shared';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import styles from './GameEndResultStyle';

export default function RoomGameEndResult() {
  const playerScore = useRecoilValue(playerScoreState);
  const onlinePlayers = useRecoilValue(onlinePlayersState);
  const userBasicInfos = useRecoilValue(userBasicInfoState);
  const roomInfos = useRecoilValue(roomInfosState);
  const [staticOnlinePlayers, setStaticOnlinePlayers] = useState(0);
  const [staticPlayerScore, setStaticPlayerScore] = useState<null | Player>(null);

  useEffect(() => {
    if (staticOnlinePlayers === 0) {
      setStaticOnlinePlayers(onlinePlayers);
    }
  }, [onlinePlayers]);

  useEffect(() => {
    if (staticPlayerScore === null) {
      setStaticPlayerScore(playerScore);
    }
  }, [playerScore]);

  if (!staticPlayerScore) return null;
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
            <Text fontSize="xxl">{staticPlayerScore.position}</Text>
            <Text fontSize="xl">{staticPlayerScore.position === 1 ? 'er' : 'e'}</Text>
          </View>
          <Text fontSize="xl">
            /{staticOnlinePlayers} joueur{staticOnlinePlayers > 1 && 's'}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text fontSize="xxl">{staticPlayerScore.score} </Text>
          <Text fontSize="xl">point{staticPlayerScore.score > 1 && 's'}</Text>
        </View>
        {roomInfos?.checkForCheat && userBasicInfos && (
          <LargeExperienceBar experience={userBasicInfos?.experience} />
        )}
      </View>
    </Card>
  );
}
