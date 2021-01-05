import onlinePlayersState from '@Src/global/Room/onlinePlayers';
import { RoomEvent, EmitOnlinePlayers } from '@squiz/shared';
import { useSetRecoilState } from 'recoil';

import useListener from './useListener';

export default function useOnlinePlayersListener() {
  useListener(RoomEvent.OnlinePlayers, updateOnlinePlayers);
  const setOnlinePlayers = useSetRecoilState(onlinePlayersState);

  function updateOnlinePlayers(onlinePlayers: EmitOnlinePlayers) {
    setOnlinePlayers(onlinePlayers);
  }
}
