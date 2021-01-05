import { EmitScoreboard } from '@squiz/shared';
import { atom } from 'recoil';

const scoreboardState = atom<EmitScoreboard>({
  key: 'scoreboardState',
  default: [],
});

export default scoreboardState;
