import Route from '@ioc:Adonis/Core/Route';

Route.post('room-create', 'RoomController.create').middleware(['auth', 'banned']);

Route.get('room-join/:code', 'RoomController.join').middleware(['auth', 'banned']);
