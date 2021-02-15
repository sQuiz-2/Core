import Route from '@ioc:Adonis/Core/Route';

Route.resource('news', 'NewsController')
  .apiOnly()
  .middleware({
    store: ['auth', 'admin'],
    update: ['auth', 'admin'],
    destroy: ['auth', 'admin'],
    show: ['auth', 'admin'],
  });
