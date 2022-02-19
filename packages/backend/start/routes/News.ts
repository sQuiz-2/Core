import Application from '@ioc:Adonis/Core/Application';
import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.resource('news', 'NewsController')
    .apiOnly()
    .middleware({
      store: ['auth', 'admin'],
      update: ['auth', 'admin'],
      destroy: ['auth', 'admin'],
      show: ['auth', 'admin'],
    });
}).prefix(Application.version!.toString());
