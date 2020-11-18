import Card from '@Src/components/Card/Card';
import { ResponsiveContainer } from '@Src/components/Containers';
import GameInput from '@Src/components/GameInput';
import PlayerInfos from '@Src/components/PlayerInfo';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import timerState from '@Src/global/timerState';
import { useSocketListener } from '@Src/utils/hooks/socketListener';
import { useSound } from '@Src/utils/hooks/sound';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { Difficulty } from 'shared/src/enums/Difficulty';
import { RoomStatus } from 'shared/src/enums/Room';
import { EmitQuestion, EmitAnswer } from 'shared/src/typings/Room';

import GameInProgressAnswer from '../Answer';
import GameInProgressQuestion from '../Question';
import RoomTitle from '../RoomTitle';
import RoundCounter from '../RoundCounter';
import Scoreboard from '../Scoreboard';
import useGameInProgessStyle from './GameInProgessStyle';

type GameInProgessProps = {
  status: RoomStatus;
  players: DisplayPlayer[];
  roomInfos: { difficulty: Difficulty } | null;
};

export default function GameInProgess({ status, players, roomInfos }: GameInProgessProps) {
  const styles = useGameInProgessStyle();
  const setTime = useSetRecoilState(timerState);
  const question: null | EmitQuestion = useSocketListener('question', null);
  const answers: EmitAnswer = useSocketListener('answer', []);
  const gameStartSound = useSound({ source: require('@Assets/sounds/game-start.mp3') });

  useEffect(() => {
    switch (status) {
      case RoomStatus.Starting:
        setTime(20);
        gameStartSound.play();
    }
  }, [status]);

  return (
    <ResponsiveContainer>
      <View style={styles.info}>
        <Card style={styles.card}>
          <RoomTitle roomInfos={roomInfos} />
        </Card>
        <Card style={[styles.card, styles.grow, styles.scoreboard]}>
          <Scoreboard players={players} />
        </Card>
        <Card>
          <PlayerInfos players={players} />
        </Card>
      </View>
      <View style={styles.game}>
        <View style={styles.grow}>
          <GameInProgressQuestion question={question} />
          <GameInProgressAnswer answers={answers} />
        </View>
        <RoundCounter />
        <GameInput />
      </View>
    </ResponsiveContainer>
  );
}
