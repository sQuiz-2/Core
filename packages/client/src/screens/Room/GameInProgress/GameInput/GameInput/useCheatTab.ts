import roomInfosState from '@Src/global/Room/roomInfos';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useRecoilValue } from 'recoil';

export default function useCheatTab(onCheat: () => void) {
  const roomInfos = useRecoilValue(roomInfosState);

  useEffect(() => {
    if (Platform.OS !== 'web' || !roomInfos) return;
    // Check if the anti-cheat is enable or if the client is a staff member
    if (roomInfos.checkForCheat === false || roomInfos.staff === true) return;
    window.onfocus = onCheat;
  }, [roomInfos]);
}
