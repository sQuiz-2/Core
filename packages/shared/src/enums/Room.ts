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
}

export enum SocketErrors {
  AlreadyConnected = 'Already connected',
  MissingParameter = 'Missing parameter',
}
