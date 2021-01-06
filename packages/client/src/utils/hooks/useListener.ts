import homeSocketState from '@Src/global/homeSocket';
import roomSocketState from '@Src/global/roomSocket';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

export default function useListener<T>(
  event: string,
  callback: (data: T) => void,
  useHomeSocket?: boolean
) {
  const socket = useRecoilValue(useHomeSocket ? homeSocketState : roomSocketState);
  const savedCallback = useRef<null | ((data: T) => void)>();
  const listener = useRef<SocketIOClient.Emitter | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    return () => {
      if (listener.current?.hasListeners) {
        listener.current.removeEventListener(event);
      }
    };
  }, []);

  useEffect(() => {
    if (!socket) return;
    listen();
  }, [socket]);

  function listen() {
    if (listener.current?.hasListeners) {
      listener.current.removeEventListener(event);
    }
    listener.current = socket!.on(event, (data: T) => savedCallback.current!(data));
  }
}
