import { atom } from 'recoil';

export type Player = {
  name: string;
  score: number;
  avatar: number;
  id: string;
  find: boolean;
};

const playerInfoState = atom<Player | null>({
  key: 'playerInfoState',
  default: null,
});

export default playerInfoState;
