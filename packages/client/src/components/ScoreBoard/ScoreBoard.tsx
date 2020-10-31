import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import playerInfoState, { Player } from '../../global/playerInfoState';
import socketState from '../../global/socket';
import { useSocketListener } from '../../utils/hooks/socketListener';
import Text from '../Text';
import ScoreBoardContent from './ScoreBoardContent';

export default function ScoreBoard() {
  const players: Player[] = useSocketListener('players', []);
  const socket = useRecoilValue(socketState);
  const setPlayerInfo = useSetRecoilState(playerInfoState);

  useEffect(() => {
    if (!socket || players.length === 0) return;
    const playerInfos = players.find((player) => player.id === socket.id);
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
        <ScoreBoardContent players={players} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  grow: {
    flexGrow: 1,
  },
});
