import { atom } from 'recoil';

const onlinePlayersState = atom<number>({
  key: 'onlinePlayersState',
  default: 0,
});

export default onlinePlayersState;
