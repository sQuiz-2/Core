import { MeBasic } from '@squiz/shared';
import { atom } from 'recoil';

const userBasicInfoState = atom<MeBasic | null>({
  key: 'userBasicInfoState',
  default: null,
});

export default userBasicInfoState;
