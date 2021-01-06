import roomInfosState from '@Src/global/Room/roomInfos';
import useListener from '@Src/utils/hooks/useListener';
import { RoomEvent } from '@squiz/shared';
import { useSetRecoilState } from 'recoil';

export default function useRoomInfosListener() {
  useListener(RoomEvent.Infos, updateRoomInfos);
  const setRoomInfos = useSetRecoilState(roomInfosState);

  function updateRoomInfos(roomInfo: { title: string }) {
    setRoomInfos(roomInfo);
  }
}
