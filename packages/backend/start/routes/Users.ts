import Route from '@ioc:Adonis/Core/Route';

Route.resource('users', 'UsersController')
  .apiOnly()
  .middleware({ '*': ['auth', 'admin'] });

Route.get('/me-basic', 'UsersController.meBasic').middleware('auth');

Route.get('/refresh-twitch-token', 'UsersController.refreshTwitchToken').middleware('auth');

Route.put('/me-edit', 'UsersController.editMe').middleware('auth');

Route.get('/users/public/:id', 'UsersController.publicUser');

Route.put('/users/ban/:id', 'UsersController.ban').middleware(['auth', 'admin']);

Route.delete('/users/ban/:id', 'UsersController.unban').middleware(['auth', 'admin']);
