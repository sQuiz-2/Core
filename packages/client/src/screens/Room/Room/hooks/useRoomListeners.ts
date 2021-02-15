import useAnswerListener from './useAnswerListener';
import useCompleteScoreboardListener from './useCompleteScoreboardListener';
import useGameEndPlayerInfosListener from './useGameEndPlayerInfos';
import useOnlinePlayersListener from './useOnlinePlayersListener';
import usePlayerScoreListener from './usePlayerScoreListener';
import useQuestionListener from './useQuestionListener';
import useQuestionsListener from './useQuestionsListener';
import useRoomInfosListener from './useRoomInfosListener';
import useRoomStatusListener from './useRoomStatusListener';
import useScoreboardListener from './useScoreboardListener';
import useValidAnswerListener from './useValidAnswerListener';

export default function useRoomListeners() {
  useRoomStatusListener();
  useRoomInfosListener();
  useOnlinePlayersListener();
  usePlayerScoreListener();
  useQuestionListener();
  useScoreboardListener();
  useValidAnswerListener();
  useAnswerListener();
  useQuestionsListener();
  useCompleteScoreboardListener();
  useGameEndPlayerInfosListener();
}
