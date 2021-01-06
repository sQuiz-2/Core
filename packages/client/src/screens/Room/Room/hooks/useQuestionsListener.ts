import questionsState from '@Src/global/Room/questions';
import useListener from '@Src/utils/hooks/useListener';
import { EmitQuestions, GameEvent } from '@squiz/shared';
import { useSetRecoilState } from 'recoil';

export default function useQuestionsListener() {
  useListener(GameEvent.Questions, updateRoomInfos);
  const setQuestions = useSetRecoilState(questionsState);

  function updateRoomInfos(questions: EmitQuestions) {
    setQuestions(questions);
  }
}
