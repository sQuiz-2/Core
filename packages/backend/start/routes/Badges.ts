import Application from '@ioc:Adonis/Core/Application';
import Route from '@ioc:Adonis/Core/Route';

// Used by the lambda function who doesn't know the current version
Route.post('badges/twitch-reward', 'UserBadgesController.storeTwitchBuyable').middleware([
  'auth',
  'admin',
]);

Route.group(() => {
  Route.get('badges/show', 'UserBadgesController.show').middleware(['auth']);
}).prefix(Application.version!.toString());
