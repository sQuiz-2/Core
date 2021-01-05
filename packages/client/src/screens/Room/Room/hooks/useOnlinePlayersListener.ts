import onlinePlayersState from '@Src/global/Room/onlinePlayers';
import { RoomEvent, EmitOnlinePlayers } from '@squiz/shared';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import useListener from './useListener';

export default function useOnlinePlayersListener() {
  useListener(RoomEvent.OnlinePlayers, updateOnlinePlayers);
  const setOnlinePlayers = useSetRecoilState(onlinePlayersState);

  useEffect(() => {
    return () => {
      setOnlinePlayers(0);
    };
  }, []);

  function updateOnlinePlayers(onlinePlayers: EmitOnlinePlayers) {
    setOnlinePlayers(onlinePlayers);
  }
}
