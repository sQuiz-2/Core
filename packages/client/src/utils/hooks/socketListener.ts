import { useEffect, useRef, useState } from 'react';

export function useSocketListener<T>(
  event: string,
  defaultValue: any,
  socket: SocketIOClient.Socket | null
) {
  const listener = useRef<SocketIOClient.Emitter | null>(null);
  const [data, setData] = useState<T>(defaultValue);

  useEffect(() => {
    if (!socket) return;
    listen();
  }, [socket]);

  function listen() {
    if (listener.current?.hasListeners) {
      listener.current.removeEventListener(event);
    }
    listener.current = socket!.on(event, (data: any) => setData(data));
  }

  useEffect(() => {
    return () => {
      if (listener.current?.hasListeners) {
        listener.current.removeEventListener(event);
      }
    };
  }, []);

  return data;
}
