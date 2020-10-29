import React from 'react';
import { useRecoilValue } from 'recoil';

import timerState from '../../global/timerState';
import Timer from './Timer';

export default function GameTimer() {
  const originalTime = useRecoilValue(timerState);

  return <Timer time={originalTime} size={40} strokeWidth={3} />;
}
