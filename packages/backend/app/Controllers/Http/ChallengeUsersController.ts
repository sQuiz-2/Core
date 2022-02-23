import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';

export default class ChallengeUsersController {
  public async show({ auth }: HttpContextContract) {
    await auth.user?.load('challenges');
    const winnedGames = await Database.query()
      .from('users')
      .select(Database.raw('sum(game_stats.win) as game_win'))
      .leftJoin('game_stats', 'game_stats.user_id', 'users.id')
      .where('users.id', auth.user!.id)
      .groupBy('users.id')
      .first();
    return { unlockedChallenges: auth.user?.challenges, winnedGames: winnedGames.game_win };
  }
}
