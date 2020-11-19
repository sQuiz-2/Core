export enum RoomStatus {
  Waiting,
  Starting,
  InProgress,
  Ended,
}

export enum RoomEvent {
  Connection = 'connection',
  Disconnect = 'disconnect',
  Players = 'players',
  Status = 'status',
  Infos = 'infos',
}
