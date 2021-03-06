import SocketError from '@Src/components/SocketError';
import roomStatusState from '@Src/global/Room/roomStatus';
import { HomeNavigatorProps } from '@Src/typings/navigation';
import useRoomSocket from '@Src/utils/hooks/roomSocket';
import { RoomStatus } from '@squiz/shared';
import React from 'react';
import { useRecoilValue } from 'recoil';

import GameEnd from '../GameEnd';
import GameInProgress from '../GameInProgress/GameInProgress';
import useRoomListeners from './hooks/useRoomListeners';

export default function Room({ route }: HomeNavigatorProps<'Room'>) {
  const error = useRoomSocket(route.params.id);
  const status = useRecoilValue(roomStatusState);
  useRoomListeners();

  if (error) {
    return <SocketError error={error} />;
  }

  if (status.status === RoomStatus.Ended) {
    return <GameEnd />;
  } else {
    return <GameInProgress />;
  }
}
