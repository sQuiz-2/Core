import Timer from '@Src/components/Timer';
import timerState from '@Src/global/timerState';
import React from 'react';
import { useRecoilValue } from 'recoil';

export default function GameTimer() {
  const originalTime = useRecoilValue(timerState);

  return <Timer time={originalTime} size={40} strokeWidth={3} />;
}
