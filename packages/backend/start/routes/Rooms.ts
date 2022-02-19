import Application from '@ioc:Adonis/Core/Application';
import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('room-create', 'RoomController.create').middleware(['auth', 'banned']);

  Route.get('room-join/:code', 'RoomController.join').middleware(['auth', 'banned']);
}).prefix(Application.version!.toString());
