import { RoomStatus } from '@squiz/shared';
import { atom } from 'recoil';

const roomStatusState = atom<{ status: RoomStatus }>({
  key: 'roomStatusState',
  default: {
    status: RoomStatus.Waiting,
  },
});

export default roomStatusState;
