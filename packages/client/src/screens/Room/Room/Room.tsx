import SocketError from '@Src/components/SocketError';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import userState from '@Src/global/userState';
import { HomeNavigatorProps } from '@Src/typings/navigation';
import { useRoomListener } from '@Src/utils/hooks/roomListener';
import useRoomSocket from '@Src/utils/hooks/roomSocket';
import { setPlayersPosition } from '@Src/utils/players';
import { GameEvent, RoomStatus, RoomEvent, EmitPlayer, EmitQuestions } from '@squiz/shared';
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import GameEnd from '../GameEnd';
import GameInProgress from '../GameInProgress/GameInProgress';

export default function Room({ route }: HomeNavigatorProps<'Room'>) {
  const { username } = useRecoilValue(userState);
  const { error } = useRoomSocket(route.params.id, { pseudo: username });
  const status = useRoomListener<{ status: RoomStatus }>(RoomEvent.Status, {
    status: RoomStatus.Waiting,
  });
  const players = useRoomListener<EmitPlayer>(RoomEvent.Players, []);
  const roomInfos = useRoomListener<{ title: string } | null>(RoomEvent.Infos, null);
  const questions = useRoomListener<EmitQuestions>(GameEvent.Questions, []);
  const [displayPlayer, setDisplayPlayer] = useState<DisplayPlayer[]>([]);

  useEffect(() => {
    if (players.length < 1) return;
    const displayPlayer = setPlayersPosition(players);
    setDisplayPlayer(displayPlayer);
  }, [players]);

  if (error) {
    return <SocketError error={error} />;
  }

  if (status.status === RoomStatus.Ended) {
    return <GameEnd players={displayPlayer} questions={questions} />;
  } else {
    return <GameInProgress status={status.status} players={displayPlayer} roomInfos={roomInfos} />;
  }
}
