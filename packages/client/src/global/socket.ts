import { atom } from 'recoil';

const socketState = atom<null | SocketIOClient.Socket>({
  key: 'socketState',
  default: null,
  dangerouslyAllowMutability: true,
});

export default socketState;
