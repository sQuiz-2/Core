import Route from '@ioc:Adonis/Core/Route';

Route.get('scoreboard/win/:difficulty', 'ScoreboardsController.win');
Route.get('scoreboard/experience', 'ScoreboardsController.experience');
Route.get('scoreboard/correct/:difficulty', 'ScoreboardsController.correct');
