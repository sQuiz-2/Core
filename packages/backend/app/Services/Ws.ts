import Server from '@ioc:Adonis/Core/Server';
import socketIo from 'socket.io';

class Ws {
  public isReady = false;
  public io: socketIo.Server;

  /**
   * Create the Socket.io server
   * @param callback Call on new client connection
   */
  public start(callback: (socket: socketIo.Socket) => void) {
    this.io = socketIo(Server.instance!);
    this.io.on('connection', callback);
    this.isReady = true;
  }
}

/**
 * This makes our service a singleton
 */
export default new Ws();
