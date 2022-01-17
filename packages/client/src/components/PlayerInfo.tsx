import playerScoreState from '@Src/global/Room/playerScore';
import userBasicInfoState from '@Src/global/userBasicInfos';
import React from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import { ScoreboardRow } from './ScoreBoard/';

export default function PlayerInfos() {
  const player = useRecoilValue(playerScoreState);
  const userBasicInfos = useRecoilValue(userBasicInfoState);

  if (!player) return null;
  return (
    <View>
      <ScoreboardRow
        player={{
          ...player,
          avatar: userBasicInfos?.avatar || '0',
          badge: userBasicInfos?.badge || '0',
        }}
      />
    </View>
  );
}
