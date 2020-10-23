import { atom } from 'recoil';

const pseudoState = atom<string | null>({
  key: 'pseudoState',
  default: 'player' + Math.floor(Math.random() * Math.floor(999)),
});

export default pseudoState;
