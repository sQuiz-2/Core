import Scoreboard from '@Src/components/ScoreBoard';
import Text from '@Src/components/Text';
import onlinePlayersState from '@Src/global/Room/onlinePlayers';
import scoreboardState from '@Src/global/Room/scoreboard';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import styles from './GameInProgressScoreboardStyle';

export default function ScoreBoard() {
  const onlinePlayers = useRecoilValue(onlinePlayersState);
  const players = useRecoilValue(scoreboardState);

  return (
    <>
      <View style={styles.top}>
        <Text fontFamily="title" fontSize="xxl">
          JOUEURS
        </Text>
        <Text fontFamily="title" fontSize="xxl">
          {onlinePlayers}
        </Text>
      </View>
      <View style={styles.grow}>
        <Scoreboard players={players} />
      </View>
    </>
  );
}
