import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

import { Quiz } from '../components/Game';
import getEnv from '../constant/index';
import pseudoState from '../global/pseudoState';
import socketState from '../global/socket';
import { HomeNavigatorProps } from '../typings/navigation';

export default function Room({ route }: HomeNavigatorProps<'Room'>) {
  const setSocket = useSetRecoilState(socketState);
  const pseudo = useRecoilValue(pseudoState);

  useFocusEffect(
    React.useCallback(() => {
      if (!pseudo) return;
      const socket = io(getEnv().serverUrl + route.params.id, {
        query: {
          pseudo,
        },
        reconnectionAttempts: 3,
      });
      setSocket(socket);
      return () => socket.close();
    }, [pseudo])
  );

  return <Quiz />;
}
