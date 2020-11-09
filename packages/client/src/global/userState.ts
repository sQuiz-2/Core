import { atom } from 'recoil';

export type User = {
  username: string;
  token: null | string;
};

const userState = atom<User>({
  key: 'userState',
  default: {
    username: 'player' + Math.floor(Math.random() * Math.floor(999)),
    token: null,
  },
});

export default userState;
