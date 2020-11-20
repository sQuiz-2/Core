import { ResponsiveContainer } from '@Src/components/Containers';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import { useSound } from '@Src/utils/hooks/sound';
import { EmitQuestions } from '@squiz/shared';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import GameEndQuestion from '../Details/Questions';
import RoomGameEndResult from '../Details/Results';
import GameEndScoreBoard from '../ScoreBoard';
import useGameEndStyle from './GameEndStyle';

type RoomGameEndContainerProps = {
  players: DisplayPlayer[];
  questions: EmitQuestions;
};

export default function RoomGameEndContainer({ players, questions }: RoomGameEndContainerProps) {
  const styles = useGameEndStyle();
  const gameEndSound = useSound({ source: require('@Assets/sounds/game-end.mp3') });

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
        <GameEndQuestion questions={questions} />
      </View>
    </ResponsiveContainer>
  );
}
