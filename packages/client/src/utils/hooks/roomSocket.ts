import roomSocketState from '@Src/global/roomSocket';
import userState from '@Src/global/userState';
import { RoomEvent } from '@squiz/shared';
import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

export default function useRoomSocket(route?: string) {
  const { username, token, connected, privateCode } = useRecoilValue(userState);
  const setRoomSocket = useSetRecoilState(roomSocketState);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    if (connected === null) return;
    const url = process.env.BACKEND_URL || '';
    const roomSocket = io(url + route, {
      query: { pseudo: username, token, privateCode },
      reconnectionAttempts: 2,
      upgrade: false,
      transports: ['websocket'],
      forceNew: true,
    });
    setRoomSocket(roomSocket);
    roomSocket.on(RoomEvent.CustomError, (err: string) => {
      setError(err);
    });
    roomSocket.on(RoomEvent.Error, (err: string) => {
      setError(err);
    });
    return () => {
      roomSocket.close();
    };
  }, [token]);

  return error;
}
