import { ResponsiveContainer } from '@Src/components/Containers';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import socketState from '@Src/global/socket';
import { useSound } from '@Src/utils/hooks/sound';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRecoilValue } from 'recoil';

import GameEndQuestion from '../Details/Questions';
import RoomGameEndResult from '../Details/Results';
import GameEndScoreBoard from '../ScoreBoard';
import useGameEndStyle from './GameEndStyle';

type RoomGameEndContainerProps = {
  players: DisplayPlayer[];
};

export default function RoomGameEndContainer({ players }: RoomGameEndContainerProps) {
  const styles = useGameEndStyle();
  const gameEndSound = useSound({ source: require('@Assets/sounds/game-end.mp3') });
  const socket = useRecoilValue(socketState);

  useEffect(() => {
    gameEndSound.play();
  }, []);

  return (
    <ResponsiveContainer style={styles.container}>
      <View style={styles.scoreboard}>
        <GameEndScoreBoard players={players} />
      </View>
      <View style={styles.details}>
        <RoomGameEndResult players={players} />
        <GameEndQuestion />
      </View>
    </ResponsiveContainer>
  );
}
