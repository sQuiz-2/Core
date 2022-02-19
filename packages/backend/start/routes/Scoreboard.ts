import Application from '@ioc:Adonis/Core/Application';
import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.get('scoreboard/win/:difficulty', 'ScoreboardsController.win');
  Route.get('scoreboard/experience', 'ScoreboardsController.experience');
  Route.get('scoreboard/correct/:difficulty', 'ScoreboardsController.correct');
}).prefix(Application.version!.toString());
