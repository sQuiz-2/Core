import Route from '@ioc:Adonis/Core/Route';

Route.resource('users', 'UsersController')
  .apiOnly()
  .middleware({ '*': ['auth', 'admin'] });

Route.get('/me-basic', 'UsersController.meBasic').middleware('auth');
