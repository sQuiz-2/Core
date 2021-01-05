import playerScoreState from '@Src/global/Room/playerScore';
import { RoomEvent, Player } from '@squiz/shared';
import { useSetRecoilState } from 'recoil';

import useListener from './useListener';

export default function usePlayerScoreListener() {
  useListener(RoomEvent.PlayerScore, updatePlayerScore);
  const setPlayerScore = useSetRecoilState(playerScoreState);

  function updatePlayerScore(player: Player) {
    setPlayerScore(player);
  }
}
