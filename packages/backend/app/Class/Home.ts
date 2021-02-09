import { GetDifficultyFromName, RoomCreateConfig, RoomEvent, SocketErrors } from '@squiz/shared';
import Ws from 'App/Services/Ws';
import { randomString } from 'App/Utils/Random';
import { Socket } from 'socket.io';

import RoomPool from './RoomPool';

const MAX_CONNECTION = 120;

class Home {
  socket: SocketIO.Server;
  /**
   * Keep track of the number of connection per ip
   */
  connectedIp = {};

  /**
   * Keep track of the number of socket connected into the home
   */
  connectedCounter = 0;

  constructor() {
    Ws.start(this.connection.bind(this));
    this.socket = Ws.io;
  }

  /**
   * Check if the socket can be connected
   */
  private preConnection(): void {
    if (this.connectedCounter >= MAX_CONNECTION) {
      throw new Error(SocketErrors.ServerFull);
    }
  }

  /**
   * Handle connection
   */
  private connection(socket: Socket): void {
    try {
      this.preConnection();
    } catch (error) {
      socket.emit(RoomEvent.CustomError, error.message);
      socket.disconnect(true);
      return;
    }
    this.connectedCounter++;
    socket.emit('rooms', RoomPool.getRooms());
    socket.on(RoomEvent.CreateRoom, (roomConfig?: RoomCreateConfig) =>
      this.createRoom(socket, roomConfig),
    );
    socket.on(RoomEvent.JoinPrivate, (code?: string) => this.joinPrivate(socket, code));
    socket.on(RoomEvent.Disconnection, () => this.disconnection());
  }

  /**
   * Disconnect the socket
   */
  private disconnection(): void {
    this.connectedCounter--;
  }

  private createRoom(socket: Socket, roomConfig?: RoomCreateConfig) {
    if (
      !roomConfig ||
      typeof roomConfig.antiCheat !== 'boolean' ||
      typeof roomConfig.players !== 'number' ||
      typeof roomConfig.selectedDifficulty !== 'string'
    ) {
    } else {
      const randomPrivateTitle = randomString(4);
      const roomId = RoomPool.addRoom({
        difficulty: GetDifficultyFromName(roomConfig.selectedDifficulty),
        antiCheat: roomConfig.antiCheat,
        maxPlayers: roomConfig.players,
        private: true,
        title: randomPrivateTitle,
      });
      socket.emit(RoomEvent.RoomCreated, { roomId, privateCode: randomPrivateTitle });
    }
  }

  private joinPrivate(socket: Socket, code?: string) {
    if (!code || typeof code !== 'string' || code.length !== 4) {
      socket.emit(RoomEvent.CustomError, SocketErrors.InvalidPrivateCode);
    }
    const privateRoomId = RoomPool.getRoomIdWithCode(code!);
    socket.emit(RoomEvent.PrivateRoomJoin, privateRoomId);
  }

  /**
   * Add or increment the ip in the connectedIp object
   */
  /* private addIp(remoteIp: string): boolean {
    if (this.connectedIp[remoteIp]) {
      if (this.connectedIp[remoteIp] >= MAX_CONNECTION_PER_IP) {
        return false;
      }
      this.connectedIp[remoteIp]++;
    } else {
      this.connectedIp[remoteIp] = 1;
    }
    return true;
  } */

  /**
   * remove or decrement the ip in the connectedIp object
   */
  /* private removeIp(remoteIp: string): void {
    this.connectedIp[remoteIp]--;
    if (this.connectedIp[remoteIp] === 0) {
      delete this.connectedIp[remoteIp];
    }
  } */
}

export default new Home();
