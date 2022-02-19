import Application from '@ioc:Adonis/Core/Application';
import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.resource('games', 'GamesController')
    .apiOnly()
    .middleware({ '*': ['auth', 'admin'] });
}).prefix(Application.version!.toString());
