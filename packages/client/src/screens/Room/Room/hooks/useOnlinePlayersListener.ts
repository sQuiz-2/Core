import onlinePlayersState from '@Src/global/Room/onlinePlayers';
import useListener from '@Src/utils/hooks/useListener';
import { RoomEvent, EmitOnlinePlayers } from '@squiz/shared';
import { useSetRecoilState } from 'recoil';

export default function useOnlinePlayersListener() {
  useListener(RoomEvent.OnlinePlayers, updateOnlinePlayers);
  const setOnlinePlayers = useSetRecoilState(onlinePlayersState);

  function updateOnlinePlayers(onlinePlayers: EmitOnlinePlayers) {
    setOnlinePlayers(onlinePlayers);
  }
}
