import { atom } from 'recoil';

export type User = {
  username: null | string;
  token: null | string;
  connected: null | boolean;
};

const userState = atom<User>({
  key: 'userState',
  default: {
    username: null,
    token: null,
    connected: false,
  },
});

export default userState;
