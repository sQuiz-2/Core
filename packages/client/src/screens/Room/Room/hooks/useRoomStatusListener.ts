import roomInfosState from '@Src/global/Room/roomInfos';
import roomStatusState from '@Src/global/Room/roomStatus';
import timerState from '@Src/global/timerState';
import { useSound } from '@Src/utils/hooks/sound';
import useListener from '@Src/utils/hooks/useListener';
import { GameTime, RoomEvent, RoomStatus } from '@squiz/shared';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useReset from './useResetStates';

export default function useRoomStatusListener() {
  useListener(RoomEvent.Status, updateRoomStatus);
  const setRoomStatus = useSetRecoilState(roomStatusState);
  const setTime = useSetRecoilState(timerState);
  const gameStartSound = useSound({ source: require('@Assets/sounds/game-start.mp3') });
  const gameEndSound = useSound({ source: require('@Assets/sounds/game-end.mp3') });
  const resetStates = useReset();
  const roomInfos = useRecoilValue(roomInfosState);

  function updateRoomStatus(roomStatus: { status: RoomStatus }) {
    setRoomStatus(roomStatus);
    const timeToAnswer = roomInfos?.timeToAnswer || GameTime.Question;
    const timeBetweenQuestion = roomInfos?.timeBetweenQuestion || GameTime.Answer;
    switch (roomStatus.status) {
      case RoomStatus.Starting:
        setTime(timeToAnswer + timeBetweenQuestion);
        gameStartSound?.play();
        break;
      case RoomStatus.Waiting:
        resetStates();
        break;
      case RoomStatus.Ended:
        gameEndSound?.play();
    }
  }
}
