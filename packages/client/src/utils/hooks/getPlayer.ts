import { DisplayPlayer } from '@Src/global/playerInfoState';
import socketState from '@Src/global/socket';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export default function useGetPlayer(players: DisplayPlayer[]) {
  const [player, setPlayer] = useState<null | DisplayPlayer>(null);
  const socket = useRecoilValue(socketState);

  useEffect(() => {
    if (!socket || players.length < 1) return;
    const player = players.find((player) => player.id === socket.id);
    if (player) {
      setPlayer(player);
    }
  }, [players, socket]);

  return player;
}
