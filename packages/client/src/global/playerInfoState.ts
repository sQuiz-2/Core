import { atom } from 'recoil';
import { Player } from 'shared/src/typings/Room';

export interface DisplayPlayer extends Player {
  position: number;
}

const playerInfoState = atom<DisplayPlayer | null>({
  key: 'playerInfoState',
  default: null,
});

export default playerInfoState;
