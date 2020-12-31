import { RoomEvent, SocketErrors } from '@squiz/shared';
import Ws from 'App/Services/Ws';
import { Socket } from 'socket.io';

import RoomPool from './RoomPool';

const MAX_CONNECTION = 200;
const MAX_CONNECTION_PER_IP = 1000;

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
  private preConnectionSuccess(socket: Socket): boolean {
    if (this.connectedCounter >= MAX_CONNECTION) {
      socket.emit(RoomEvent.CustomError, SocketErrors.ServerFull);
      socket.disconnect(true);
      return false;
    }
    const successfullyAdded = this.addIp(socket.conn.remoteAddress);
    if (successfullyAdded === false) {
      socket.emit(RoomEvent.CustomError, SocketErrors.ExceedMaxConnectionPerIp);
      socket.disconnect(true);
      return false;
    }
    return true;
  }

  /**
   * Handle connection
   */
  private connection(socket: Socket): void {
    if (!this.preConnectionSuccess(socket)) return;
    this.connectedCounter++;
    socket.emit('rooms', RoomPool.getRooms());
    socket.on(RoomEvent.Disconnection, () => this.disconnection(socket.conn.remoteAddress));
  }

  /**
   * Disconnect the socket
   */
  private disconnection(remoteIp: string): void {
    this.removeIp(remoteIp);
    this.connectedCounter--;
  }

  /**
   * Add or increment the ip in the connectedIp object
   */
  private addIp(remoteIp: string): boolean {
    if (this.connectedIp[remoteIp]) {
      if (this.connectedIp[remoteIp] >= MAX_CONNECTION_PER_IP) {
        return false;
      }
      this.connectedIp[remoteIp]++;
    } else {
      this.connectedIp[remoteIp] = 1;
    }
    return true;
  }

  /**
   * remove or decrement the ip in the connectedIp object
   */
  private removeIp(remoteIp: string): void {
    this.connectedIp[remoteIp]--;
    if (this.connectedIp[remoteIp] === 0) {
      delete this.connectedIp[remoteIp];
    }
  }
}

export default new Home();
