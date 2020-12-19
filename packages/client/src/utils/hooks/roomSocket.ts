import roomSocketState from '@Src/global/roomSocket';
import { RoomEvent } from '@squiz/shared';
import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

export default function useRoomSocket(route?: string, query?: any) {
  const setRoomSocket = useSetRecoilState(roomSocketState);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const url = process.env.BACKEND_URL || '';
    const roomSocket = io(url + route, {
      query,
      reconnectionAttempts: 2,
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
  }, []);

  return { error };
}
