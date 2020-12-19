import { atom } from 'recoil';

const roomSocketState = atom<null | SocketIOClient.Socket>({
  key: 'roomSocketState',
  default: null,
  dangerouslyAllowMutability: true,
});

export default roomSocketState;
