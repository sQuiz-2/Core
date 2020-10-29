import { atom } from 'recoil';

const timerState = atom<number>({
  key: 'timerState',
  default: 20,
});

export default timerState;
