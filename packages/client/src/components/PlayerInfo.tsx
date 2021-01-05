import playerScoreState from '@Src/global/Room/playerScore';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { ScoreboardRow } from './ScoreBoard/';

export default function PlayerInfos() {
  const player = useRecoilValue(playerScoreState);

  if (!player) return null;
  return (
    <View>
      <ScoreboardRow player={player} />
    </View>
  );
}
