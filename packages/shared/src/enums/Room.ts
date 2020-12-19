export enum RoomStatus {
  Waiting,
  Starting,
  InProgress,
  Ended,
}

export enum RoomEvent {
  Connection = 'connection',
  Disconnection = 'disconnect',
  Players = 'players',
  Status = 'status',
  Infos = 'infos',
  Rooms = 'rooms',
  RoomUpdate = 'roomUpdate',
  Error = 'error',
  CustomError = 'ce',
}

export enum SocketErrors {
  AlreadyConnected = 'ac',
  MissingParameter = 'mp',
  ServerFull = 'sf',
  ExceedMaxConnectionPerIp = 'em',
}
