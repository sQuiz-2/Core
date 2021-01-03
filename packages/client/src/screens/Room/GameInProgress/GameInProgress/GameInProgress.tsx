import Card from '@Src/components/Card/Card';
import { ResponsiveContainer } from '@Src/components/Containers';
import PlayerInfos from '@Src/components/PlayerInfo';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import timerState from '@Src/global/timerState';
import { useSound } from '@Src/utils/hooks/sound';
import { RoomStatus, GameTime } from '@squiz/shared';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useSetRecoilState } from 'recoil';

import useRoomListen from '../../Room/useRoomListen';
import GameInput from '../GameInput';
import Question from '../Question';
import RoomTitle from '../RoomTitle';
import RoundCounter from '../RoundCounter';
import RoundEnd from '../RoundEnd';
import Scoreboard from '../Scoreboard';
import useGameInProgressStyle from './GameInProgressStyle';

type GameInProgressProps = {
  status: RoomStatus;
  players: DisplayPlayer[];
  roomInfos: { title: string } | null;
};

export default function GameInProgress({ status, players, roomInfos }: GameInProgressProps) {
  const styles = useGameInProgressStyle();
  const setTime = useSetRecoilState(timerState);
  const gameStartSound = useSound({ source: require('@Assets/sounds/game-start.mp3') });
  const { question, answers, ranks, scoreDetail } = useRoomListen();

  useEffect(() => {
    switch (status) {
      case RoomStatus.Starting:
        setTime(GameTime.Question + GameTime.Answer);
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
          <Question question={question} />
          <RoundEnd answers={answers} scoreDetail={scoreDetail} />
        </View>
        <RoundCounter ranks={ranks} />
        <GameInput question={question} />
      </View>
    </ResponsiveContainer>
  );
}
