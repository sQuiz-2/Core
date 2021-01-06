import playerRankState from '@Src/global/Room/playerRanks';
import playerScoreState from '@Src/global/Room/playerScore';
import { RoomEvent, EmitPlayerScore } from '@squiz/shared';
import { useSetRecoilState } from 'recoil';

import useListener from './useListener';

export default function usePlayerScoreListener() {
  useListener(RoomEvent.PlayerScore, updatePlayerScore);
  const setPlayerScore = useSetRecoilState(playerScoreState);
  const setPlayerRanks = useSetRecoilState(playerRankState);

  function updatePlayerScore(player: EmitPlayerScore) {
    setPlayerScore(player);
    if (player.ranks) {
      setPlayerRanks(player.ranks);
    }
  }
}
