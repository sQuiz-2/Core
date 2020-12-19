import { DisplayPlayer } from '@Src/global/playerInfoState';
import roomSocketState from '@Src/global/roomSocket';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export default function useGetPlayer(players: DisplayPlayer[]) {
  const [player, setPlayer] = useState<null | DisplayPlayer>(null);
  const roomSocket = useRecoilValue(roomSocketState);

  useEffect(() => {
    if (!roomSocket || players.length < 1) return;
    const player = players.find((player) => player.id === roomSocket.id);
    if (player) {
      setPlayer(player);
    }
  }, [players, roomSocket]);

  return player;
}
