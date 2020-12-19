import { atom } from 'recoil';

const homeSocketState = atom<null | SocketIOClient.Socket>({
  key: 'homeSocketState',
  default: null,
  dangerouslyAllowMutability: true,
});

export default homeSocketState;
