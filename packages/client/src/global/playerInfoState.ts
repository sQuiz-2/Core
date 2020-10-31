import { atom } from 'recoil';

export type Player = {
  name: string;
  score: number;
  avatar: number;
  id: string;
  find: boolean;
};

export interface DisplayPlayer extends Player {
  position: number;
}

const playerInfoState = atom<DisplayPlayer | null>({
  key: 'playerInfoState',
  default: null,
});

export default playerInfoState;
