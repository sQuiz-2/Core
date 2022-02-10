import Route from '@ioc:Adonis/Core/Route';

Route.post('badges/twitch-reward', 'UserBadgesController.storeTwitchBuyable').middleware([
  'auth',
  'admin',
]);

Route.get('badges/show', 'UserBadgesController.show').middleware(['auth']);
