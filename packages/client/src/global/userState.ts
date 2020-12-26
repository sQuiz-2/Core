import { atom } from 'recoil';

export type User = {
  username: null | string;
  token: null | string;
};

const userState = atom<User>({
  key: 'userState',
  default: {
    username: null,
    token: null,
  },
});

export default userState;
