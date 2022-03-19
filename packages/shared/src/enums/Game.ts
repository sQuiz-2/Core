export enum GameEvent {
  Answer = 'answer',
  Guess = 'guess',
  Question = 'question',
  RoundCounter = 'roundCounter',
  Ranks = 'ranks',
  ScoreDetail = 'scoreDetail',
  Questions = 'questions',
  ValidAnswer = 'va',
  WrongAnswer = 'wa',
  GameEndPlayerInfos = 'gp',
  PlayerTrophies = 'playerTrophies',
  RoomAdminStartGame = 'roomAdminStartGame',
  RoomAdminStartRound = 'roomAdminStartRound',
  Pause = 'pause',
}

export enum GameRank {
  RoundComing = -1,
  NotAnswered = 0,
  First = 1,
  Second = 2,
  Third = 3,
}

export enum GameTime {
  Question = 13,
  Answer = 5,
  End = 30,
}
