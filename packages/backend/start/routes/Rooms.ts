import Route from '@ioc:Adonis/Core/Route';

Route.post('room-create', 'RoomController.create');

Route.get('room-join/:code', 'RoomController.join');
