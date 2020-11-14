import useGetPlayer from '@Src/utils/hooks/getPlayer';
import React from 'react';
import { View } from 'react-native';

import { DisplayPlayer } from '../global/playerInfoState';
import { ScoreboardRow } from './ScoreBoard/';

type PlayerInfosProps = {
  players: DisplayPlayer[];
};

export default function PlayerInfos({ players }: PlayerInfosProps) {
  const player = useGetPlayer(players);

  if (!player) return null;
  return (
    <View>
      <ScoreboardRow player={player} />
    </View>
  );
}
