import { Level } from '@Src/components/ExperienceBar';
import Text from '@Src/components/Text';
import { get } from '@Src/utils/wrappedFetch';
import { PlayerPublicInfos } from '@squiz/shared';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

import Modal from '../Modal';
import styles from './PlayerModalStyle';

type PlayerModalProps = {
  playerId?: number;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

export default function PlayerModal({ playerId, visible, setVisible }: PlayerModalProps) {
  const [playerInfos, setPlayerInfos] = useState<PlayerPublicInfos>();

  async function fetchPlayerInfos() {
    setPlayerInfos(undefined);
    try {
      const publicInfos = await get<PlayerPublicInfos>({ path: 'users/public/' + playerId });
      if (!publicInfos) return;
      setPlayerInfos(publicInfos);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!playerId) return;
    fetchPlayerInfos();
  }, [playerId]);

  return (
    <>
      <Modal visible={visible} setVisible={setVisible}>
        {playerInfos ? (
          <View style={styles.container}>
            <View style={styles.player}>
              <Level experience={playerInfos.experience} large />
              <Text style={{ paddingLeft: 10 }} fontSize="lg">
                {playerInfos.username}
              </Text>
            </View>
            <Text style={styles.textStats} fontSize="xxl">
              {playerInfos.game_played || 0}{' '}
              <Text style={styles.textDetails} fontSize="xl">
                parties jouées
              </Text>
            </Text>
            <Text style={styles.textStats} fontSize="xxl">
              {playerInfos.game_podium || 0}{' '}
              <Text style={styles.textDetails} fontSize="xl">
                podiums
              </Text>
            </Text>
            <Text style={styles.textStats} fontSize="xxl">
              {playerInfos.game_win || 0}{' '}
              <Text style={styles.textDetails} fontSize="xl">
                victoires
              </Text>
            </Text>
            <Text style={styles.textStats} fontSize="xxl">
              {Math.floor(
                (Number(playerInfos.round_correct) / Number(playerInfos.round_played)) * 100
              ) || 0}
              %{' '}
              <Text style={styles.textDetails} fontSize="xl">
                de réussite
              </Text>
            </Text>
          </View>
        ) : (
          <ActivityIndicator />
        )}
      </Modal>
    </>
  );
}
