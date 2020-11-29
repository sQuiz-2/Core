import getEnv from '@Src/constant/index';
import socketState from '@Src/global/socket';
import { useFocusEffect } from '@react-navigation/native';
import { RoomEvent } from '@squiz/shared';
import { useState, useCallback } from 'react';
import { useRecoilState } from 'recoil';
import io from 'socket.io-client';

export default function useSocketConnect(route?: string, query?: any) {
  const [socket, setSocket] = useRecoilState(socketState);
  const [error, setError] = useState<null | string>(null);

  useFocusEffect(
    useCallback(() => {
      route = route || '';
      const ioSocket = io(getEnv().backendUrl + route, {
        query,
        reconnectionAttempts: 3,
      });
      setSocket(ioSocket);
      ioSocket.on(RoomEvent.Error, (err: string) => {
        setError(err);
      });
      return () => ioSocket.close();
    }, [])
  );

  return { socket, error };
}
