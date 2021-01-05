import {
  Difficulty,
  RoomStatus,
  RoomEvent,
  EmitRoomUpdate,
  SocketErrors,
  EmitScoreboard,
  GameRank,
} from '@squiz/shared';
import Ws from 'App/Services/Ws';
import { EventEmitter } from 'events';
import { Namespace, Socket } from 'socket.io';

import Player from './Player';

export type RoomProps = {
  roomNumber: string;
  difficulty: Difficulty;
  title: string;
};

const MAX_PLAYERS = 100;

export default class Room {
  /**
   * Unique id identifier
   */
  id: string;

  /**
   * Room name
   */
  title: string;

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

  /**
   * Boolean to check if players can join the room
   */
  isFull: boolean = false;

  constructor({ roomNumber, difficulty, title }: RoomProps) {
    this.nameSpace = Ws.io.of(roomNumber);
    this.nameSpace.on(RoomEvent.Connection, this.connection.bind(this));
    this.id = roomNumber;
    this.difficulty = difficulty;
    this.title = title;
  }

  /**
   * Middleware to check if the player is not already connected
   */
  private preConnectionSuccess(socket: Socket): boolean {
    let name = socket.handshake?.query?.pseudo;
    if (!name) {
      socket.emit(RoomEvent.CustomError, SocketErrors.MissingParameter);
      socket.disconnect(true);
      return false;
    }
    // Let's make sure you are not already in this room !
    const player = this.getPlayerByName(name);
    if (player) {
      // Hummm how can you be here and also in the room ??? Have y  ou been disconnected ?
      if (!player.disconnected) {
        // It's seems you're already playing in this room !
        socket.emit(RoomEvent.CustomError, SocketErrors.AlreadyConnected);
        socket.disconnect(true);
        return false;
      }
      // Ok you have been disconnected,
      // we are going to make a new link between your new connection and your saved data
    } else {
      if (this.isFull) {
        socket.emit(RoomEvent.CustomError, SocketErrors.ServerFull);
        socket.disconnect(true);
        return false;
      }
    }
    // todo: authenticate the player
    if (player) {
      player.reconnect(socket.id);
      this.emitToSocket(
        RoomEvent.PlayerScore,
        {
          id: player.id,
          name: player.name,
          score: player.score,
          rank: player.currentRank,
          position: 0,
        },
        player.id,
      );
    } else {
      if (name === 'null') {
        name = this.findPseudo();
        this.addPlayer(name, socket, true);
      } else {
        this.addPlayer(name, socket, false);
      }
    }
    return true;
  }

  /**
   * Run on each socket connection
   */
  private connection(socket: Socket): void {
    if (!this.preConnectionSuccess(socket)) return;
    this.emitRoomInfos(socket);
    if (this.players.length < 21) {
      this.emitScoreBoard();
    } else {
      // emit only to the new player
    }
    this.emit(RoomEvent.OnlinePlayers, this.players.length);
    this.joinGame(socket);
    this.updateRoom();
    socket.on(RoomEvent.Disconnection, () => this.disconnection(socket));
  }

  /**
   * Run on each socket disconnection
   * keep the player if the game is in progress
   * remove the player if the game is not in progress
   */
  private disconnection(socket: Socket): void {
    const player = this.getPlayer(socket.id);
    if (this.status === RoomStatus.InProgress && !player?.isGuess) {
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
    const roomUpdate: EmitRoomUpdate = {
      id: this.id,
      players: this.players.length,
      isFull: this.isFull,
    };
    Ws.io.emit(RoomEvent.RoomUpdate, roomUpdate);
  }

  /**
   * Store a new player
   */
  private addPlayer(name: string, socket: Socket, isGuess: boolean): void {
    const lastPlayer = this.players[this.players.length - 1];
    let position = 1;
    if (lastPlayer) {
      position = lastPlayer.score === 0 ? lastPlayer.position : lastPlayer.position + 1;
    }
    this.players.push(new Player({ name, id: socket.id, isGuess, position }));
    if (this.players.length >= MAX_PLAYERS) {
      this.isFull = true;
    }
    this.emitToSocket(
      RoomEvent.PlayerScore,
      {
        id: socket.id,
        name,
        score: 0,
        rank: GameRank.RoundComing,
        position,
      },
      socket.id,
    );
  }

  /**
   * Remove a player and emit the new scoreboard
   */
  private removePlayer(socket: Socket): void {
    this.players = this.players.filter(({ id }) => id !== socket.id);
    if (this.isFull) {
      this.isFull = false;
    }
    this.emit(RoomEvent.OnlinePlayers, this.players.length);
    if (this.players.length < 20) {
      this.sortPlayers();
      this.updatePlayersPosition();
      this.emitScoreBoard();
    }
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
   * Emit the scoreboard to all sockets
   */
  public emitScoreBoard(): void {
    const players: EmitScoreboard = this.players
      .slice(0, 20)
      .map(({ id, name, score, currentRank, position }) => ({
        id,
        name,
        score,
        rank: currentRank,
        position,
      }));
    this.emit(RoomEvent.Scoreboard, players);
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
   * Send room information to a socket
   */
  private emitRoomInfos(socket: Socket): void {
    this.emitToSocket(RoomEvent.Infos, { title: this.title }, socket.id);
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

  /**
   * Update players position
   */
  public updatePlayersPosition(): void {
    for (let i = 0, position = 1; i < this.players.length; i++) {
      this.players[i].position = position;
      if (this.players[i + 1] && this.players[i + 1].score < this.players[i].score) {
        position++;
      }
    }
  }

  /**
   * Find a pseudo for player which is not connected
   */
  private findPseudo(): string {
    const pseudo = 'player' + Math.floor(Math.random() * Math.floor(9999));
    return pseudo;
  }

  public joinGame(_socket: Socket): void {}
  public gameStop(): void {}
}
