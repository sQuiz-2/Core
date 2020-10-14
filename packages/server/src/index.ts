import 'dotenv/config';
import io, { Socket } from 'socket.io';
import Game from 'squiz-api/app/Models/Game';

import { getGames } from './requests';
import RoomPool from './rooms/roomPool';

const ioServer = io.listen(4240);
if (process.env.ALLOWED_ORIGIN) {
  ioServer.origins(process.env.ALLOWED_ORIGIN);
}

async function server(games: Game[]) {
  const Rooms = new RoomPool({ games, server: ioServer });

  let clients = 0;

  ioServer.on('connection', function (socket: Socket) {
    if (clients >= 20) {
      socket.emit('full', '💥 Pas de chance nos serveurs sont pleins ! 💥');
      socket.disconnect(true);
      return;
    }
    /* Easy way to count client, .clients doesn't send the "real" value */
    clients++;
    ioServer.emit('connected', clients);
    ioServer.emit('rooms', Rooms.getRooms());
    socket.on('disconnect', function () {
      clients--;
      ioServer.emit('connected', clients);
    });
  });
}

function start() {
  let connectionTry = 0;
  let games: Game[] = [];
  const interval = setInterval(async () => {
    try {
      games = await getGames();
      clearInterval(interval);
      server(games);
    } catch (e) {
      console.error('API request error (getGames)');
      connectionTry++;
      if (connectionTry >= 4) {
        console.error("Can't connect to the API, server stop");
        ioServer.close();
        clearInterval(interval);
      }
    }
  }, 5000);
}

start();
