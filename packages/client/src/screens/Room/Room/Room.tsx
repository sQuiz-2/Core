import { QuizConainer } from '@Src/components/GameContainer';
import getEnv from '@Src/constant/index';
import socketState from '@Src/global/socket';
import userState from '@Src/global/userState';
import { HomeNavigatorProps } from '@Src/typings/navigation';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

import GameEnd from '../GameEnd';

export default function Room({ route }: HomeNavigatorProps<'Room'>) {
  /* const setSocket = useSetRecoilState(socketState);
  const { username } = useRecoilValue(userState);

  useFocusEffect(
    React.useCallback(() => {
      if (!username) return;
      const socket = io(getEnv().backendUrl + route.params.id, {
        query: {
          pseudo: username,
        },
        reconnectionAttempts: 3,
      });
      setSocket(socket);
      return () => socket.close();
    }, [username])
  ); */

  return <GameEnd />;
}
