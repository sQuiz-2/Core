import { Player } from '@squiz/shared';
import { atom } from 'recoil';

export interface DisplayPlayer extends Player {
  position: number;
}

const playerInfoState = atom<DisplayPlayer | null>({
  key: 'playerInfoState',
  default: null,
});

export default playerInfoState;
