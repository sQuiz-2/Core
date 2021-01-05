import scoreboardState from '@Src/global/Room/scoreboard';
import { RoomEvent, EmitScoreboard } from '@squiz/shared';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import useListener from './useListener';

export default function useScoreboardListener() {
  useListener(RoomEvent.Scoreboard, updateScoreboard);
  const setScoreboard = useSetRecoilState(scoreboardState);

  useEffect(() => {
    return () => {
      setScoreboard([]);
    };
  }, []);

  function updateScoreboard(players: EmitScoreboard) {
    setScoreboard(players);
  }
}
