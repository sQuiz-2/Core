export const enum RoomStatus {
  Waiting,
  Starting,
  InProgress,
  Ended,
}

export const enum RoomEvent {
  Connection = 'connection',
  Disconnect = 'disconnect',
  Players = 'players',
  Status = 'status',
  Infos = 'infos',
}
