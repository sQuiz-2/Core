import homeSocketState from '@Src/global/homeSocket';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import io from 'socket.io-client';

export default function useHomeSocket() {
  const setHomeSocket = useSetRecoilState(homeSocketState);

  useEffect(() => {
    const homeSocket = io(process.env.BACKEND_URL || '', { reconnectionAttempts: 2 });
    setHomeSocket(homeSocket);
    return () => {
      homeSocket.close();
    };
  }, []);
}
