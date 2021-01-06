import { EmitAnswer } from '@squiz/shared';
import { atom } from 'recoil';

const answerState = atom<EmitAnswer | null>({
  key: 'answerState',
  default: null,
});

export default answerState;
