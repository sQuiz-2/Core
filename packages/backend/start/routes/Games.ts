import Application from '@ioc:Adonis/Core/Application';
import Route from '@ioc:Adonis/Core/Route';
import { RoomEvent } from '@squiz/shared';
import Ws from 'App/Services/Ws';

Route.group(() => {
  Route.resource('games', 'GamesController')
    .apiOnly()
    .middleware({ '*': ['auth', 'admin'] });

  Route.post('send-message', ({ auth, request }) => {
    const { message } = request.body();
    Ws.io.emit(RoomEvent.AdminMessage, { user: auth.user?.username, message });
  }).middleware(['auth', 'admin']);
}).prefix(Application.version!.toString());
