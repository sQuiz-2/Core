import Application from '@ioc:Adonis/Core/Application';
import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.resource('rounds', 'RoundsController')
    .apiOnly()
    .middleware({ '*': ['auth', 'admin'] });
  Route.post('rounds/store-lot', 'RoundsController.storeLot').middleware(['auth', 'admin']);
  Route.get('rounds-all', 'RoundsController.getAll').middleware(['auth', 'admin']);
  Route.put('/reports/reset/:id', 'ReportsController.reset').middleware(['auth', 'admin']);
  Route.post('rounds/report/:id', 'RoundsController.report').middleware(['auth']);
}).prefix(Application.version!.toString());
