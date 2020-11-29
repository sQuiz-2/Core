import {
  Difficulty,
  RoomStatus,
  RoomEvent,
  EmitPlayer,
  EmitRoomUpdate,
  SocketErrors,
} from '@squiz/shared';
import Ws from 'App/Services/Ws';
import { EventEmitter } from 'events';
import { Namespace, Socket } from 'socket.io';

import Player from './Player';

export type RoomProps = {
  roomNumber: string;
  difficulty: Difficulty;
};

const MAX_PLAYERS = 30;

export default class Room {
  /**
   * Unique id identifier
   */
  id: string;

  /**
   * Socket.io room namespace
   */
  nameSpace: Namespace;

  /**
   * Difficulty allow us to fetch the correct questions
   */
  difficulty: Difficulty;

  /**
   * Send an event when the game can start
   */
  eventEmitter: EventEmitter = new EventEmitter();

  /**
   * We want to allow players to disconnect and reconnect,
   * sockets are destroy if you leave a namespace, so we
   * store all the players during the game
   */
  players: Player[] = [];

  /**
   * Current status of the room Waiting, Starting...
   */
  status: RoomStatus = RoomStatus.Waiting;

  constructor({ roomNumber, difficulty }: RoomProps) {
    this.nameSpace = Ws.io.of(roomNumber);
    this.nameSpace.use(this.preConnection.bind(this));
    this.nameSpace.on(RoomEvent.Connection, this.connection.bind(this));
    this.id = roomNumber;
    this.difficulty = difficulty;
  }

  /**
   * Middleware to check if the player is not already connected
   */
  private preConnection(socket: Socket, next: (err?: any) => void): void {
    if (this.players.length >= MAX_PLAYERS) {
      return next(new Error(SocketErrors.ServerFull));
    }
    const name = socket.handshake?.query?.pseudo;
    if (!name) {
      return next(new Error(SocketErrors.MissingParameter));
    }
    // Let's make sure you are not already in this room !
    const player = this.getPlayerByName(name);
    if (player) {
      // Hummm how can you be here and also in the room ??? Have you been disconected ?
      if (!player.disconnected) {
        // It's seems you'r already playing in this room !
        return next(new Error(SocketErrors.AlreadyConnected));
      }
      // Ok you have been disconnected,
      // we are going to make a new link between your new connection and your saved data
    }
    // todo: authenticate the player
    if (player) {
      player.reconnect(socket.id);
    } else {
      this.addPlayer(name, socket.id);
    }
    next();
  }

  /**
   * Run on each socket connection
   */
  private connection(socket: Socket): void {
    this.emitRoomInfos(socket);
    this.emitScoreBoard();
    this.joinGame(socket);
    this.updateRoom();
    socket.on(RoomEvent.Disconnection, () => this.disconnection(socket));
  }

  /**
   * Run on each socket deconnection
   * keep the player if the game is in progress
   * remove the player if the game is not in progress
   */
  private disconnection(socket: Socket): void {
    if (this.status === RoomStatus.InProgress) {
      this.disconnectPlayer(socket.id);
    } else {
      this.removePlayer(socket);
      this.updateRoom();
      if (this.players.length <= 0) {
        this.gameStop();
        this.status = RoomStatus.Waiting;
      }
    }
  }

  /**
   * Update player prop disconnected to true and
   * keep the player in memory
   */
  private disconnectPlayer(id: string): void {
    const player = this.getPlayer(id);
    if (!player) return;
    player.disconnect();
  }

  /**
   * Remove disconnected players
   */
  public removeDisconnectedPlayers(): void {
    this.players = this.players.filter((player) => !player.disconnected);
    this.updateRoom();
  }

  /**
   * Update home information
   */
  private updateRoom(): void {
    const roomUpdate: EmitRoomUpdate = { id: this.id, players: this.players.length };
    Ws.io.emit(RoomEvent.RoomUpdate, roomUpdate);
  }

  /**
   * Store a new player and emit the new scoreboard
   */
  private addPlayer(name: string, id: string): void {
    this.players.push(new Player({ name, id }));
  }

  /**
   * Remove a player and emit the new scoreboard
   */
  private removePlayer(socket: Socket): void {
    this.players = this.players.filter(({ id }) => id !== socket.id);
    this.emitScoreBoard();
  }

  /**
   * Emit data to all the sockets connected on this NameSpace
   */
  public emit(event: string, data: any): void {
    this.nameSpace.emit(event, data);
  }

  /**
   * Emit data to one socket
   */
  public emitToSocket(event: string, data: any, id: string): void {
    this.nameSpace.to(id).emit(event, data);
  }

  /**
   * Emit the room status to all connected sockets
   */
  public emitStatus(): void {
    this.emit(RoomEvent.Status, { status: this.status });
  }

  /**
   * Emit the room status to one socket
   */
  public emitStatusToSocket(id: string): void {
    this.emitToSocket(RoomEvent.Status, { status: this.status }, id);
  }

  /**
   * Sort the players and emit the scoreboard to all connected sockets
   */
  public emitScoreBoard(): void {
    this.sortPlayers();
    const players: EmitPlayer = this.players.map(({ id, name, score, currentRank }) => {
      return { id, name, score, rank: currentRank };
    });
    this.emit(RoomEvent.Players, players);
  }

  /**
   * Get a player with a socket id
   */
  public getPlayer(id: string): Player | undefined {
    return this.players.find((player) => player.id === id);
  }

  /**
   * Get a player with a socket id
   */
  public getPlayerByName(name: string): Player | undefined {
    return this.players.find((player) => player.name === name);
  }

  /**
   * Reset all players for a new game
   */
  public resetPlayersForNewGame() {
    this.players.forEach((player) => player.resetForNewGame());
  }

  /**
   * Reset all players for a new round
   */
  public resetPlayersForNewRound(): void {
    this.players.forEach((player) => player.resetForNewRound());
  }

  /**
   * Send room informations to a socket
   */
  private emitRoomInfos(socket: Socket): void {
    this.emitToSocket(RoomEvent.Infos, { difficulty: this.difficulty }, socket.id);
  }

  /**
   * Edit room status and emit it to all connected sockets
   */
  public setStatus(status: RoomStatus): void {
    this.status = status;
    this.emitStatus();
  }

  /**
   * Sort all the players by score
   */
  public sortPlayers(): void {
    this.players.sort((a, b) => b.score - a.score);
  }

  public joinGame(_socket: Socket): void {}
  public gameStop(): void {}
}
