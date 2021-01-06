import { Player } from '@squiz/shared';
import { atom } from 'recoil';

const playerScoreState = atom<Player | null>({
  key: 'playerScoreState',
  default: null,
});

export default playerScoreState;
