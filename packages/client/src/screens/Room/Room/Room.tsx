import { DisplayPlayer } from '@Src/global/playerInfoState';
import userState from '@Src/global/userState';
import { HomeNavigatorProps } from '@Src/typings/navigation';
import useSocketConnect from '@Src/utils/hooks/socketConnect';
import { useSocketListener } from '@Src/utils/hooks/socketListener';
import { setPlayersPosition } from '@Src/utils/players';
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Difficulty } from 'shared/src/enums/Difficulty';
import { GameEvent } from 'shared/src/enums/Game';
import { RoomStatus, RoomEvent } from 'shared/src/enums/Room';
import { EmitPlayer, EmitQuestions } from 'shared/src/typings/Room';

import GameEnd from '../GameEnd';
import GameInProgess from '../GameInProgress/GameInPrgress';

export default function Room({ route }: HomeNavigatorProps<'Room'>) {
  const { username } = useRecoilValue(userState);
  useSocketConnect(route.params.id, { pseudo: username });
  const status: { status: RoomStatus } = useSocketListener(RoomEvent.Status, RoomStatus.Waiting);
  const players: EmitPlayer = useSocketListener(RoomEvent.Players, []);
  const [displayPlayer, setDisplayPlayer] = useState<DisplayPlayer[]>([]);
  const roomInfos: { difficulty: Difficulty } | null = useSocketListener('infos', null);
  const questions: EmitQuestions = useSocketListener(GameEvent.Questions, []);

  useEffect(() => {
    if (players.length < 1) return;
    const displayPlayer = setPlayersPosition(players);
    setDisplayPlayer(displayPlayer);
  }, [players]);

  if (status.status === RoomStatus.Ended) {
    return <GameEnd players={displayPlayer} questions={questions} />;
  } else {
    return <GameInProgess status={status.status} players={displayPlayer} roomInfos={roomInfos} />;
  }
}
