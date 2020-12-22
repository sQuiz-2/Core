import Server from '@ioc:Adonis/Core/Server';
import { nodeEnv, appUrl } from 'Config/app';
import socketIo from 'socket.io';

class Ws {
  public isReady = false;
  public io: socketIo.Server;

  /**
   * Create the Socket.io server
   * @param callback Call on new client connection
   */
  public start(callback: (socket: socketIo.Socket) => void) {
    const origin = nodeEnv === 'production' ? appUrl + ':443' : appUrl;
    this.io = socketIo(Server.instance!, {
      origins: origin,
      perMessageDeflate: false,
      transports: ['websocket'],
    });
    this.io.on('connection', callback);
    this.isReady = true;
  }
}

/**
 * This makes our service a singleton
 */
export default new Ws();
