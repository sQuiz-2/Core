/**
 * Room object
 */

import { EventEmitter } from 'events';
import { Difficulty } from 'shared/src/enums/Difficulty';
import { RoomStatus, RoomEvent } from 'shared/src/enums/Room';
import { EmitPlayer } from 'shared/src/typings/Room';
import { Namespace, Socket } from 'socket.io';

import Player from './Player';

export type RoomProps = {
  nameSpace: Namespace;
  roomNumber: string;
  title: string;
  difficulty: Difficulty;
};

export default class Room {
  difficulty: Difficulty;
  event: EventEmitter = new EventEmitter();
  id: string;
  nameSpace: Namespace; // Socket.io room namespace
  players: Player[] = [];
  status: RoomStatus = RoomStatus.Waiting;
  title: string;

  constructor({ title, nameSpace, roomNumber, difficulty }: RoomProps) {
    this.nameSpace = nameSpace;
    this.id = roomNumber;
    this.title = title;
    this.difficulty = difficulty;
  }

  private addPlayer(socket: Socket) {
    this.players.push(new Player({ name: socket.handshake.query.pseudo, id: socket.id }));
    this.emitScoreBoard();
  }

  public emit(event: string, data: any) {
    this.nameSpace.emit(event, data);
  }

  public emitScoreBoard() {
    this.sortPlayers();
    const players: EmitPlayer = this.players.map(({ id, name, score, currentRank }) => {
      return { id, name, score, rank: currentRank };
    });
    this.emit(RoomEvent.Players, players);
  }

  public emitStatus() {
    this.emit(RoomEvent.Status, { status: this.status });
  }

  public emitStatusToSocket(id: string) {
    this.emitToSocket(RoomEvent.Status, { status: this.status }, id);
  }

  public emitToSocket(event: string, data: any, id: string) {
    this.nameSpace.to(id).emit(event, data);
  }

  public gameStop() {}

  public getPlayer(id: string): Player | undefined {
    return this.players.find((player) => player.id === id);
  }

  public getPlayers() {
    return this.players.map(({ id, name, score }) => ({ name, score, id }));
  }

  public initGame() {}

  public roomLoop(): void {
    this.nameSpace.on(RoomEvent.Connection, (socket: Socket) => {
      this.sendRoomInfos(socket);
      this.addPlayer(socket);
      this.startGame(socket);
      socket.on(RoomEvent.Disconnect, () => {
        this.removePlayer(socket);
        if (this.players.length <= 0) {
          this.gameStop();
          this.status = RoomStatus.Waiting;
        }
      });
    });
  }

  private removePlayer(socket: Socket) {
    this.players = this.players.filter(({ id }) => id !== socket.id);
    this.emitScoreBoard();
  }

  private sendRoomInfos(socket: Socket) {
    this.emitToSocket(RoomEvent.Infos, { difficulty: this.difficulty }, socket.id);
  }

  public setStatus(status: RoomStatus) {
    this.status = status;
    this.emit(RoomEvent.Status, { status: this.status });
  }

  public sortPlayers() {
    this.players.sort((a, b) => b.score - a.score);
  }

  public startGame(_socket: Socket) {}
}
