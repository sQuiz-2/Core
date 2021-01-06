import { EmitQuestions } from '@squiz/shared';
import { atom } from 'recoil';

const questionsState = atom<EmitQuestions>({
  key: 'questionsState',
  default: [],
});

export default questionsState;
