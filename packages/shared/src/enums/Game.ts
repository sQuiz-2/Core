export enum GameEvent {
  Answer = 'answer',
  Guess = 'guess',
  AnswerIsValid = 'answerIsValid',
  Question = 'question',
  RoundCounter = 'roundCounter',
  Ranks = 'ranks',
  ScoreDetail = 'scoreDetail',
  Questions = 'questions',
}

export enum GameRank {
  RoundComing = -1,
  NotAnswered = 0,
  First = 1,
  Second = 2,
  Third = 3,
}
