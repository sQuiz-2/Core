import { atom } from 'recoil';

const pseudoState = atom<string | null>({
  key: 'pseudoState',
  default: null,
});

export default pseudoState;
