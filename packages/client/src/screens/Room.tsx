import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

import { QuizConainer } from '../components/GameContainer';
import getEnv from '../constant/index';
import socketState from '../global/socket';
import userState from '../global/userState';
import { HomeNavigatorProps } from '../typings/navigation';

export default function Room({ route }: HomeNavigatorProps<'Room'>) {
  const setSocket = useSetRecoilState(socketState);
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
  );

  return <QuizConainer />;
}
