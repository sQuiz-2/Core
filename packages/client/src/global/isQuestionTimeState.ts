import { atom } from 'recoil';

const isQuestionTimeState = atom<boolean>({
  key: 'isQuestionTimeState',
  default: false,
});

export default isQuestionTimeState;
