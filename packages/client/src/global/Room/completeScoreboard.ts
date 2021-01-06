import { EmitScoreboard } from '@squiz/shared';
import { atom } from 'recoil';

const completeScoreboardState = atom<EmitScoreboard>({
  key: 'completeScoreboardState',
  default: [],
});

export default completeScoreboardState;
