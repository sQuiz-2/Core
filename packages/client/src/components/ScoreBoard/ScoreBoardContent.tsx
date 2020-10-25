import React from 'react';
import { ScrollView } from 'react-native';

import { Player } from '../../global/playerInfoState';
import PlayerRow from './playerRow';

type Props = {
  players: Player[];
};

export default function ScoreBoardContent({ players }: Props) {
  return (
    <ScrollView>
      {players.map((player) => (
        <PlayerRow player={player} key={player.id} />
      ))}
    </ScrollView>
  );
}
