import RoomPool from 'App/Class/RoomPool';
import Ws from 'App/Services/Ws';

Ws.start((socket) => {
  socket.emit('rooms', RoomPool.getRooms());
});
