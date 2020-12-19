import homeSocketState from '@Src/global/homeSocket';
import { useRecoilValue } from 'recoil';

import { useSocketListener } from './socketListener';

export function useHomeListener<T>(event: string, defaultValue: T) {
  const homeSocket = useRecoilValue(homeSocketState);
  const receivedValue = useSocketListener<T>(event, defaultValue, homeSocket);
  return receivedValue;
}
