import { EmitRoomInfos } from '@squiz/shared';
import { atom } from 'recoil';

const roomInfosState = atom<EmitRoomInfos | null>({
  key: 'roomInfosState',
  default: null,
});

export default roomInfosState;
