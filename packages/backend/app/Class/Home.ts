import { RoomEvent, SocketErrors } from '@squiz/shared';
import Ws from 'App/Services/Ws';
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
    socket.on(RoomEvent.Disconnection, () => this.disconnection());
  }

  /**
   * Disconnect the socket
   */
  private disconnection(): void {
    this.connectedCounter--;
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
