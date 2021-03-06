import Route from '@ioc:Adonis/Core/Route';

// todo: add auth middleware

Route.post('room-create', 'RoomController.create').middleware(['banned']);

Route.get('room-join/:code', 'RoomController.join').middleware(['banned']);
