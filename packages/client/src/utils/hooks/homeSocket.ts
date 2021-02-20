import homeSocketState from '@Src/global/homeSocket';
import { RoomEvent } from '@squiz/shared';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

export default function useHomeSocket(onConnected: () => void) {
  const setHomeSocket = useSetRecoilState(homeSocketState);

  useEffect(() => {
    const homeSocket = io(process.env.BACKEND_URL || '', {
      reconnectionAttempts: 2,
      upgrade: false,
      transports: ['websocket'],
    });
    homeSocket.on(RoomEvent.Rooms, onConnected);
    setHomeSocket(homeSocket);
    return () => {
      homeSocket.close();
    };
  }, []);
}
