import Route from '@ioc:Adonis/Core/Route';

Route.resource('themes', 'ThemesController')
  .apiOnly()
  .middleware({
    index: ['auth'],
    store: ['auth', 'admin'],
    update: ['auth', 'admin'],
    destroy: ['auth', 'admin'],
    show: ['auth', 'admin'],
  });
