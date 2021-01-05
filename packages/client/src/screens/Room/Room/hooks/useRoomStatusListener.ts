import playerScoreState from '@Src/global/Room/playerScore';
import roomStatusState from '@Src/global/Room/roomStatus';
import timerState from '@Src/global/timerState';
import { useSound } from '@Src/utils/hooks/sound';
import { GameTime, RoomEvent, RoomStatus } from '@squiz/shared';
import { useSetRecoilState } from 'recoil';

import useListener from './useListener';

export default function useRoomStatusListener() {
  useListener(RoomEvent.Status, updateRoomStatus);
  const setRoomStatus = useSetRecoilState(roomStatusState);
  const setTime = useSetRecoilState(timerState);
  const gameStartSound = useSound({ source: require('@Assets/sounds/game-start.mp3') });
  const gameEndSound = useSound({ source: require('@Assets/sounds/game-end.mp3') });

  function updateRoomStatus(roomStatus: { status: RoomStatus }) {
    setRoomStatus(roomStatus);
    switch (roomStatus.status) {
      case RoomStatus.Starting:
        setTime(GameTime.Question + GameTime.Answer);
        gameStartSound.play();
        break;
      case RoomStatus.Ended:
        gameEndSound.play();
    }
  }
}
