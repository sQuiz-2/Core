import SocketError from '@Src/components/SocketError';
import { DisplayPlayer } from '@Src/global/playerInfoState';
import userState from '@Src/global/userState';
import { HomeNavigatorProps } from '@Src/typings/navigation';
import useSocketConnect from '@Src/utils/hooks/socketConnect';
import { useSocketListener } from '@Src/utils/hooks/socketListener';
import { setPlayersPosition } from '@Src/utils/players';
import { GameEvent, RoomStatus, RoomEvent, EmitPlayer, EmitQuestions } from '@squiz/shared';
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import GameEnd from '../GameEnd';
import GameInProgess from '../GameInProgress/GameInPrgress';

export default function Room({ route }: HomeNavigatorProps<'Room'>) {
  const { username } = useRecoilValue(userState);
  const { error } = useSocketConnect(route.params.id, { pseudo: username });
  const status: { status: RoomStatus } = useSocketListener(RoomEvent.Status, RoomStatus.Waiting);
  const players: EmitPlayer = useSocketListener(RoomEvent.Players, []);
  const [displayPlayer, setDisplayPlayer] = useState<DisplayPlayer[]>([]);
  const roomInfos: { title: string } | null = useSocketListener('infos', null);
  const questions: EmitQuestions = useSocketListener(GameEvent.Questions, []);

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
    return <GameInProgess status={status.status} players={displayPlayer} roomInfos={roomInfos} />;
  }
}
