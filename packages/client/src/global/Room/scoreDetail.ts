import { EmitScoreDetails } from '@squiz/shared';
import { atom } from 'recoil';

const scoreDetailState = atom<EmitScoreDetails | null>({
  key: 'scoreDetailState',
  default: null,
});

export default scoreDetailState;
