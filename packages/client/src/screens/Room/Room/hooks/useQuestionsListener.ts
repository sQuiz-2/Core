import questionsState from '@Src/global/Room/questions';
import { EmitQuestions, GameEvent } from '@squiz/shared';
import { useSetRecoilState } from 'recoil';

import useListener from './useListener';

export default function useQuestionsListener() {
  useListener(GameEvent.Questions, updateRoomInfos);
  const setQuestions = useSetRecoilState(questionsState);

  function updateRoomInfos(questions: EmitQuestions) {
    setQuestions(questions);
  }
}
