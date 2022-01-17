import PlayerModal from '@Src/components/Modal/Player';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import React, { useState } from 'react';
import { Pressable, ScrollView } from 'react-native';

import ScoreboardRow from '../ScoreboardRow';
import styles from './ScoreboardStyle';

type Props = {
  displayMedal?: boolean;
  players: DisplayPlayer[];
};

export default function Scoreboard({ players, displayMedal = true }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPlayerId, setModalPlayerId] = useState<number>();

  function openPlayerModal(playerId: number) {
    setModalPlayerId(playerId);
    setModalVisible(true);
  }

  return (
    <ScrollView style={styles.container}>
      <PlayerModal playerId={modalPlayerId} visible={modalVisible} setVisible={setModalVisible} />
      {players.map((player) =>
        player.dbId === undefined ? (
          <ScoreboardRow
            player={player}
            key={player.id}
            containerStyle={styles.row}
            displayMedal={displayMedal}
          />
        ) : (
          <Pressable key={player.id} onPress={() => openPlayerModal(player.dbId as number)}>
            <ScoreboardRow
              player={player}
              containerStyle={styles.row}
              displayMedal={displayMedal}
            />
          </Pressable>
        )
      )}
    </ScrollView>
  );
}
