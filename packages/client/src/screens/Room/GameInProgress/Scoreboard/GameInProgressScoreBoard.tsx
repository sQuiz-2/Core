import Scoreboard from '@Src/components/ScoreBoard';
import Text from '@Src/components/Text';
import playerInfoState, { Player, DisplayPlayer } from '@Src/global/playerInfoState';
import socketState from '@Src/global/socket';
import { useSocketListener } from '@Src/utils/hooks/socketListener';
import { setPlayersPosition } from '@Src/utils/players';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import styles from './GameInProgressScoreboardStyle';

export default function ScoreBoard() {
  const players: Player[] = useSocketListener('players', []);
  const [displayPlayers, setDisplayPlayers] = useState<DisplayPlayer[]>([]);
  const socket = useRecoilValue(socketState);
  const setPlayerInfo = useSetRecoilState(playerInfoState);

  useEffect(() => {
    if (!socket || players.length === 0) return;
    const dPlayers = setPlayersPosition(players);
    setDisplayPlayers(dPlayers);
    const playerInfos = dPlayers.find((player) => player.id === socket.id);
    if (playerInfos) {
      setPlayerInfo(playerInfos);
    }
  }, [players, socket]);

  return (
    <>
      <View style={styles.top}>
        <Text fontFamily="title" fontSize="xxl">
          JOUEURS
        </Text>
        <Text fontFamily="title" fontSize="xxl">
          {players.length}
        </Text>
      </View>
      <View style={styles.grow}>
        <Scoreboard players={displayPlayers} />
      </View>
    </>
  );
}
