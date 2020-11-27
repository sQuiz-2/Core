/**
 * Room object
 */

import { Difficulty, RoomStatus, RoomEvent, EmitPlayer } from '@squiz/shared';
import { EventEmitter } from 'events';
import { Namespace, Socket } from 'socket.io';

import Player from './Player';

export type RoomProps = {
  nameSpace: Namespace;
  roomNumber: string;
  difficulty: Difficulty;
};

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

  constructor({ nameSpace, roomNumber, difficulty }: RoomProps) {
    this.nameSpace = nameSpace.on(RoomEvent.Connection, this.connection.bind(this));
    this.id = roomNumber;
    this.difficulty = difficulty;
  }

  /**
   * Run on each socket connection
   */
  private connection(socket: Socket): void {
    this.sendRoomInfos(socket);
    this.addPlayer(socket);
    socket.on(RoomEvent.Disconnection, () => this.disconnection(socket));
  }

  /**
   * Run on each socket deconnection
   */
  private disconnection(socket: Socket): void {
    this.removePlayer(socket);
    if (this.players.length <= 0) {
      this.gameStop();
      this.status = RoomStatus.Waiting;
    }
  }

  /**
   * Store a new player and emit the new scoreboard
   */
  private addPlayer(socket: Socket): void {
    this.players.push(new Player({ name: socket.handshake.query.pseudo, id: socket.id }));
    this.emitScoreBoard();
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

  public gameStop() {}

  /**
   * Get a player with a socket id
   */
  public getPlayer(id: string): Player | undefined {
    return this.players.find((player) => player.id === id);
  }

  /**
   * Send room informations to a socket
   */
  private sendRoomInfos(socket: Socket): void {
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
}
