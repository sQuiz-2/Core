import homeSocketState from '@Src/global/homeSocket';
import { oAuthResponse, RoomEvent } from '@squiz/shared';
import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

import { getFromStore, StorageEnum } from '../storage';

export default function useHomeSocket(onConnected: () => void) {
  const setHomeSocket = useSetRecoilState(homeSocketState);
  const socketRef = useRef<SocketIOClient.Socket>();

  async function connectUser() {
    const user = await getFromStore<oAuthResponse>(StorageEnum.User);
    const homeSocket = io(process.env.BACKEND_URL || '', {
      reconnectionAttempts: 2,
      upgrade: false,
      transports: ['websocket'],
      query: { pseudo: user?.username },
    });
    socketRef.current = homeSocket;
    homeSocket.on(RoomEvent.Rooms, onConnected);
    setHomeSocket(homeSocket);
    return homeSocket;
  }

  useEffect(() => {
    connectUser();
    return () => {
      socketRef?.current?.close();
    };
  }, []);
}
