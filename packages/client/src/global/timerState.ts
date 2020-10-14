import { atom, selector } from 'recoil';

const timerState = atom<number>({
  key: 'timerState',
  default: 20,
});

const msTimerState = selector({
  key: 'msTimerState',
  get: ({ get }) => get(timerState) * 1000,
});

export { msTimerState };

export default timerState;
