import getEnv from '@Src/constant/index';
import socketState from '@Src/global/socket';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import { useRecoilState } from 'recoil';
import io from 'socket.io-client';

export default function useSocketConnect(route: string, query: any) {
  const [socket, setSocket] = useRecoilState(socketState);

  useFocusEffect(
    React.useCallback(() => {
      if (!query || socket) return;
      const ioSocket = io(getEnv().backendUrl + route, {
        query,
        reconnectionAttempts: 3,
      });
      setSocket(ioSocket);
      return () => {
        ioSocket.close();
        setSocket(null);
      };
    }, [])
  );
}
