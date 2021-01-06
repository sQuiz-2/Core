import { atom } from 'recoil';

const roomInfosState = atom<{ title: string } | null>({
  key: 'roomInfosState',
  default: null,
});

export default roomInfosState;
