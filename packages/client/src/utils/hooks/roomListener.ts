import roomSocketState from '@Src/global/roomSocket';
import { useRecoilValue } from 'recoil';

import { useSocketListener } from './socketListener';

export function useRoomListener<T>(event: string, defaultValue: T) {
  const roomSocket = useRecoilValue(roomSocketState);
  const receivedValue = useSocketListener<T>(event, defaultValue, roomSocket);
  return receivedValue;
}
