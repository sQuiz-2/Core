import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import socketState from '../../global/socket';

export function useSocketListener(event: string, defaultValue: any) {
  const socket = useRecoilValue(socketState);
  const listener = useRef<SocketIOClient.Emitter | null>(null);
  const [data, setData] = useState<any>(defaultValue);

  useEffect(() => {
    listen();
  }, [socket]);

  function listen() {
    if (socket === null) return;
    if (listener.current?.hasListeners) {
      listener.current.removeAllListeners();
    }
    listener.current = socket.on(event, (data: any) => setData(data));
  }
  return data;
}
