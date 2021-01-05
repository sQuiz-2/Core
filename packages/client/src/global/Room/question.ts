import { EmitQuestion } from '@squiz/shared';
import { atom } from 'recoil';

const questionState = atom<EmitQuestion | null>({
  key: 'questionState',
  default: null,
});

export default questionState;
