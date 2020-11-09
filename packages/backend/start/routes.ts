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
  .middleware({ store: 'auth', update: 'auth', destroy: 'auth' });

Route.resource('rounds', 'RoundsController')
  .apiOnly()
  .middleware({ /* store: 'auth', */ update: 'auth', destroy: 'auth' });

Route.resource('games', 'GamesController')
  .apiOnly()
  .middleware({ store: 'auth', update: 'auth', destroy: 'auth' });

Route.resource('difficulties', 'DifficultiesController')
  .apiOnly()
  .middleware({ store: 'auth', update: 'auth', destroy: 'auth' });

Route.resource('users', 'UsersController')
  .apiOnly()
  .middleware({ store: 'auth', update: 'auth', destroy: 'auth', index: 'auth', show: 'auth' });

Route.post('rounds/random', 'RoundsController.random');

Route.post('/login', 'AuthController.login');
Route.post('/password', 'AuthController.password').middleware('auth');
Route.post('/oauth', 'AuthController.oauth');
