import { atom } from 'recoil';

export type User = {
  username: null | string;
  token: null | string;
  privateCode: null | string;
  connected: null | boolean;
  staff: undefined | boolean;
};

const userState = atom<User>({
  key: 'userState',
  default: {
    username: null,
    token: null,
    privateCode: null,
    connected: false,
    staff: false,
  },
});

export default userState;
