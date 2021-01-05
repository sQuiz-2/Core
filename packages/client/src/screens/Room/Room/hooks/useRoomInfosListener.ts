import roomInfosState from '@Src/global/Room/roomInfos';
import { RoomEvent } from '@squiz/shared';
import { useSetRecoilState } from 'recoil';

import useListener from './useListener';

export default function useRoomInfosListener() {
  useListener(RoomEvent.Infos, updateRoomInfos);
  const setRoomInfos = useSetRecoilState(roomInfosState);

  function updateRoomInfos(roomInfo: { title: string }) {
    setRoomInfos(roomInfo);
  }
}
