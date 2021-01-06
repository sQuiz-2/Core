import scoreboardState from '@Src/global/Room/scoreboard';
import useListener from '@Src/utils/hooks/useListener';
import { RoomEvent, EmitScoreboard } from '@squiz/shared';
import { useSetRecoilState } from 'recoil';

export default function useScoreboardListener() {
  useListener(RoomEvent.Scoreboard, updateScoreboard);
  const setScoreboard = useSetRecoilState(scoreboardState);

  function updateScoreboard(players: EmitScoreboard) {
    setScoreboard(players);
  }
}
