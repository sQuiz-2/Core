import Timer from '@Src/components/Timer';
import roomInfosState from '@Src/global/Room/roomInfos';
import roomStatusState from '@Src/global/Room/roomStatus';
import isQuestionTimeState from '@Src/global/isQuestionTimeState';
import timerState from '@Src/global/timerState';
import { RoomStatus } from '@squiz/shared';
import React from 'react';
import { useRecoilValue } from 'recoil';

export default function GameTimer() {
  const originalTime = useRecoilValue(timerState);
  const roomInfos = useRecoilValue(roomInfosState);
  const roomStatus = useRecoilValue(roomStatusState);
  const isQuestionTime = useRecoilValue(isQuestionTimeState);

  if (roomInfos?.startGameManually && roomStatus.status === RoomStatus.Waiting) {
    return null;
  }
  if (roomInfos?.startRoundManually && !isQuestionTime) {
    return null;
  }

  return <Timer time={originalTime} size={40} strokeWidth={3} />;
}
