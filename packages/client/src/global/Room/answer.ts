import { Answer } from '@squiz/shared';
import { atom } from 'recoil';

const answerState = atom<Answer[] | null>({
  key: 'answerState',
  default: null,
});

export default answerState;
