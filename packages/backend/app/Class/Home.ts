import Redis from '@ioc:Adonis/Addons/Redis';
import { RoomEvent, SocketErrors } from '@squiz/shared';
import User from 'App/Models/User';
import Ws from 'App/Services/Ws';
import { Socket } from 'socket.io';

import RoomPool from './RoomPool';

const MAX_CONNECTION = 500;

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

  /**
   * All streamers currently streaming on sQuiz
   */
  streamers: string[] = [];

  /**
   * Pseudo of all admins
   */
  admins: string[] = [];

  constructor() {
    Ws.start(this.connection.bind(this));
    this.socket = Ws.io;
    Redis.subscribe('squizStreams', this.updateStreamers.bind(this));
    this.fetchAdmins();
  }

  /**
   * Fetch admins
   */
  private async fetchAdmins(): Promise<void> {
    const admins = await User.query().where('staff', true).select('username');
    admins.forEach(({ username }) => this.admins.push(username));
  }

  /**
   * Check if the socket can be connected
   */
  private preConnection(socket: Socket): void {
    const pseudo = socket.handshake?.query?.pseudo;
    if (this.connectedCounter >= MAX_CONNECTION && !this.admins.includes(pseudo)) {
      throw new Error(SocketErrors.ServerFull);
    }
  }

  /**
   * Handle connection
   */
  private connection(socket: Socket): void {
    try {
      this.preConnection(socket);
    } catch (error) {
      socket.emit(RoomEvent.CustomError, error.message);
      socket.disconnect(true);
      return;
    }
    this.connectedCounter++;
    socket.emit('rooms', RoomPool.getRooms());
    socket.emit(RoomEvent.Streams, this.streamers);
    socket.on(RoomEvent.Disconnection, () => this.disconnection());
  }

  /**
   * Disconnect the socket
   */
  private disconnection(): void {
    this.connectedCounter--;
  }

  private updateStreamers(streamers: string): void {
    this.streamers = JSON.parse(streamers);
    this.socket.emit(RoomEvent.Streams, this.streamers);
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
