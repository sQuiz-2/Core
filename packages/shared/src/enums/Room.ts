export enum RoomStatus {
  Waiting,
  Starting,
  InProgress,
  Ended,
}

export enum RoomEvent {
  Connection = 'connection',
  Disconnection = 'disconnect',
  OnlinePlayers = 'op',
  Scoreboard = 'sb',
  PlayerScore = 'ps',
  CompleteScoreboard = 'cs',
  Status = 'status',
  Infos = 'infos',
  Rooms = 'rooms',
  RoomUpdate = 'roomUpdate',
  Error = 'error',
  CustomError = 'ce',
  Streams = 'st',
}

export enum SocketErrors {
  AlreadyConnected = 'ac',
  MissingParameter = 'mp',
  ServerFull = 'sf',
  ExceedMaxConnectionPerIp = 'em',
  CantFindPseudo = 'cf',
  BadCredentials = 'bc',
  InvalidPrivateCode = 'ip',
  MissingPrivateCode = 'mc',
  Banned = 'ban',
}
