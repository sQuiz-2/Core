import { ApplicationContract } from '@ioc:Adonis/Core/Application';

export default class AppProvider {
  public static needsApplication = true;

  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }

  public async ready() {
    // App is ready
    const App = await import('@ioc:Adonis/Core/Application');

    /**
     * Only import socket and RoomPool file, when environment is `web`. In other
     * words do not import during ace commands.
     */
    if (App.default.environment === 'web') {
      /**
       * Room pool needs to be init before the socket
       * because we use the RoomPool in the socket
       */
      await import('../start/roomPool');
      await import('../start/socket');
    }
  }
}
