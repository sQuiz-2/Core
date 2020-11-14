import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import playerInfoState from '../global/playerInfoState';
import { ScoreboardRow } from './ScoreBoard/';

export default function PlayerInfos() {
  const playerInfos = useRecoilValue(playerInfoState);
  if (!playerInfos) return null;
  return (
    <View>
      <ScoreboardRow player={playerInfos} />
    </View>
  );
}
