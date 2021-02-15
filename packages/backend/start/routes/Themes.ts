import Route from '@ioc:Adonis/Core/Route';

Route.resource('themes', 'ThemesController')
  .apiOnly()
  .middleware({ '*': ['auth', 'admin'] });
