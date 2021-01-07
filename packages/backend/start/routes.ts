/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.resource('themes', 'ThemesController')
  .apiOnly()
  .middleware({ '*': ['auth', 'admin'] });

Route.resource('rounds', 'RoundsController')
  .apiOnly()
  .middleware({ '*': ['auth', 'admin'] });
Route.post('rounds/store-lot', 'RoundsController.storeLot').middleware(['auth', 'admin']);
Route.get('rounds/report/:id', 'RoundsController.report').middleware(['auth']);
Route.get('rounds-all', 'RoundsController.getAll').middleware(['auth', 'admin']);

Route.resource('games', 'GamesController')
  .apiOnly()
  .middleware({ '*': ['auth', 'admin'] });

Route.resource('users', 'UsersController')
  .apiOnly()
  .middleware({ '*': ['auth', 'admin'] });

Route.post('/login', 'AuthController.login');
Route.post('/password', 'AuthController.password').middleware(['auth', 'admin']);
Route.post('/oauth', 'AuthController.oauth');
Route.get('/logout', 'AuthController.logout').middleware(['auth']);

Route.resource('news', 'NewsController')
  .apiOnly()
  .middleware({
    store: ['auth', 'admin'],
    update: ['auth', 'admin'],
    destroy: ['auth', 'admin'],
    show: ['auth', 'admin'],
  });
