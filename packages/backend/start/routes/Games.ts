import Route from '@ioc:Adonis/Core/Route';

Route.resource('games', 'GamesController')
  .apiOnly()
  .middleware({ '*': ['auth', 'admin'] });
