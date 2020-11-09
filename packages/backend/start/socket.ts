import RoomPool from 'App/Class/RoomPool';
import Ws from 'App/Services/Ws';

/*
|--------------------------------------------------------------------------
| Socket
|--------------------------------------------------------------------------
|
| This file will be run one time (on the app start)
| It will create an entry point for for the websocket
|
*/

Ws.start((socket) => {
  socket.emit('rooms', RoomPool.getRooms());
});
