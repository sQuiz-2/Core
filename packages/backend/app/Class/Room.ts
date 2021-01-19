import {
  Difficulty,
  RoomStatus,
  RoomEvent,
  EmitRoomUpdate,
  SocketErrors,
  EmitScoreboard,
  GameRank,
  EmitPlayerScore,
} from '@squiz/shared';
import ApiToken from 'App/Models/ApiToken';
import Ws from 'App/Services/Ws';
import crypto from 'crypto';
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

  private urlDecode(encoded) {
    return Buffer.from(encoded, 'base64').toString('utf-8');
  }

  private generateHash(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private parseToken(token) {
    const parts = token.split('.');
    /**
     * Ensure the token has two parts
     */
    if (parts.length !== 2) {
      throw new Error('E_INVALID_API_TOKEN');
    }

    /**
     * Ensure the first part is a base64 encode id
     */
    const tokenId = this.urlDecode(parts[0]);

    if (!tokenId) {
      throw new Error('E_INVALID_API_TOKEN');
    }

    const parsedToken = this.generateHash(parts[1]);
    return {
      token: parsedToken,
      tokenId,
    };
  }

  private async checkToken(token: string) {
    const parsedToken = this.parseToken(token);
    const apiToken = await ApiToken.query()
      .select('userId')
      .where('id', parsedToken.tokenId)
      .andWhere('token', parsedToken.token)
      .preload('user', (query) => {
        query.select('id', 'username');
      })
      .first();
    if (!apiToken) {
      throw new Error('E_INVALID_API_TOKEN');
    }
    return apiToken.user.username;
  }

  /**
   * Middleware to check if the player is not already connected
   */
  private async preConnection(socket: Socket): Promise<void> {
    const token = socket.handshake?.query?.token;
    const queryName = socket.handshake?.query?.pseudo;

    if (!token || typeof token !== 'string' || !queryName || typeof queryName !== 'string') {
      throw new Error(SocketErrors.MissingParameter);
    }

    const player = this.getPlayerByName(queryName);

    /**
     * Check if the game is full
     */
    if (this.isFull && !player) {
      throw new Error(SocketErrors.ServerFull);
    }

    if (token && token !== 'null') {
      let dbName;
      try {
        dbName = await this.checkToken(token);
      } catch (error) {
        throw new Error(SocketErrors.BadCredentials);
      }
      if (dbName !== queryName) {
        throw new Error(SocketErrors.BadCredentials);
      }
      if (player) {
        /**
         * Hummm how can you be here and also in the room ??? Have you been disconnected ?
         */
        if (player.disconnected) {
          /**
           * Ok you have been disconnected,
           * we are going to make a new link between your new connection and your saved data
           */
          player.reconnect(socket.id);
          this.emitReconnectInfos(player);
        } else {
          /**
           * It's seems you're already playing in this room !
           */
          throw new Error(SocketErrors.AlreadyConnected);
        }
      } else {
        /**
         * The authentication process take some time let's make sure the room is still not full
         */
        if (this.isFull) {
          throw new Error(SocketErrors.ServerFull);
        }
        this.addPlayer(dbName, socket, false);
      }
    } else {
      const randomName = this.findPseudo();
      this.addPlayer(randomName, socket, true);
    }
  }

  /**
   * Run on each socket connection
   */
  private async connection(socket: Socket): Promise<void> {
    try {
      await this.preConnection(socket);
    } catch (error) {
      socket.emit(RoomEvent.CustomError, error.message);
      socket.disconnect(true);
      return;
    }
    this.emitRoomInfos(socket);
    if (this.players.length < 21) {
      this.emitScoreBoard();
    } else {
      this.emitScoreBoardTo(socket.id);
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
    this.emit(RoomEvent.OnlinePlayers, this.players.length);
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
   * Store a new player and emit his score
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
    const playerScore: EmitPlayerScore = {
      id: socket.id,
      name,
      score: 0,
      rank: GameRank.RoundComing,
      position,
    };
    this.emitToSocket(RoomEvent.PlayerScore, playerScore, socket.id);
  }

  /**
   * Emit reconnection information
   */
  private emitReconnectInfos(player: Player) {
    const infos: EmitPlayerScore = {
      id: player.id,
      name: player.name,
      score: player.score,
      rank: player.currentRank,
      position: player.position,
      ranks: player.ranks,
    };
    this.emitToSocket(RoomEvent.PlayerScore, infos, player.id);
  }

  /**
   * Remove a player and emit the new scoreboard
   */
  private removePlayer(socket: Socket): void {
    let playerPosition = 0;
    this.players = this.players.filter(({ id, position }) => {
      if (id === socket.id) {
        playerPosition = position;
        return false;
      }
      return true;
    });
    this.sortPlayers();
    this.updatePlayersPosition();
    if (playerPosition < 21) {
      this.emitScoreBoard();
    }
    if (this.isFull) {
      this.isFull = false;
    }
    this.emit(RoomEvent.OnlinePlayers, this.players.length);
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
   * Get the 20 first players
   */
  public getScoreboard(): EmitScoreboard {
    return this.players.slice(0, 20).map(({ id, name, score, currentRank, position }) => ({
      id,
      name,
      score,
      rank: currentRank,
      position,
    }));
  }

  /**
   * Emit the scoreboard to all sockets
   */
  public emitScoreBoard(): void {
    const scoreboard = this.getScoreboard();
    this.emit(RoomEvent.Scoreboard, scoreboard);
  }

  /**
   * Emit the scoreboard to one socket
   */
  public emitScoreBoardTo(id: string): void {
    const scoreboard = this.getScoreboard();
    this.emitToSocket(RoomEvent.Scoreboard, scoreboard, id);
  }

  public emitCompleteScoreboard(): void {
    const scoreboard: EmitScoreboard = this.players.map(
      ({ id, name, score, currentRank, position }) => ({
        id,
        name,
        score,
        rank: currentRank,
        position,
      }),
    );
    this.emit(RoomEvent.CompleteScoreboard, scoreboard);
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
    const pseudo = 'sQuizer' + Math.floor(Math.random() * Math.floor(9999));
    return pseudo;
  }

  public joinGame(_socket: Socket): void {}
  public gameStop(): void {}
}
