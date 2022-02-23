import Application from '@ioc:Adonis/Core/Application';
import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('challenges/show', 'ChallengeUsersController.show').middleware(['auth']);
}).prefix(Application.version!.toString());
