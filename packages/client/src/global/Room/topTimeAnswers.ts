/* import { EmitScoreboard } from '@squiz/shared'; */
import { TopTimeAnswer } from '@squiz/shared';
import { atom } from 'recoil';

const topTimeAnswerState = atom<TopTimeAnswer[]>({
  key: 'topTimeAnswerState',
  default: [],
});

export default topTimeAnswerState;
