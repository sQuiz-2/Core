import RoomPool from 'App/Class/RoomPool';

/*
|--------------------------------------------------------------------------
| RoomPool
|--------------------------------------------------------------------------
|
| This file will be run one time (on the app start), it will create a
| default rooms for each games registered in the database
|
*/

(async () => {
  await RoomPool.init();
})();
