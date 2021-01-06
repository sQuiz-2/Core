import completeScoreboardState from '@Src/global/Room/completeScoreboard';
import useListener from '@Src/utils/hooks/useListener';
import { RoomEvent, EmitScoreboard } from '@squiz/shared';
import { useSetRecoilState } from 'recoil';

export default function useCompleteScoreboardListener() {
  useListener(RoomEvent.CompleteScoreboard, updateCompleteScoreboard);
  const setCompleteScoreboard = useSetRecoilState(completeScoreboardState);

  function updateCompleteScoreboard(players: EmitScoreboard) {
    setCompleteScoreboard(players);
  }
}
