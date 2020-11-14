import userState from '@Src/global/userState';
import { HomeNavigatorProps } from '@Src/typings/navigation';
import useSocketConnect from '@Src/utils/hooks/socketConnect';
import { useSocketListener } from '@Src/utils/hooks/socketListener';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { RoomStatus } from 'shared/src/enums/Room';

import GameEnd from '../GameEnd';
import GameInProgess from '../GameInProgress/GameInPrgress';

export default function Room({ route }: HomeNavigatorProps<'Room'>) {
  const { username } = useRecoilValue(userState);
  useSocketConnect(route.params.id, { pseudo: username });
  const status: { status: RoomStatus } = useSocketListener('status', RoomStatus.Waiting);

  if (status.status === RoomStatus.Ended) {
    return <GameEnd />;
  } else {
    return <GameInProgess status={status.status} />;
  }
}
