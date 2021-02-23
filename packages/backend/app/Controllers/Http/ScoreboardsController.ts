import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import { DifficultyEnum } from '@squiz/shared';
import User from 'App/Models/User';

export default class ScoreboardsController {
  public async experience() {
    const topExperience = await User.query()
      .select('username', 'experience')
      .orderBy('experience', 'desc')
      .limit(20);
    return topExperience;
  }

  public async win({ params, response }: HttpContextContract) {
    let { difficulty } = params;
    difficulty = Number(difficulty);

    if (difficulty === 0) {
      return await Database.query()
        .select('users.username', Database.raw('sum(game_stats.win) as total_win'))
        .from('users')
        .innerJoin('game_stats', 'game_stats.user_id', 'users.id')
        .groupBy('users.id')
        .orderBy('total_win', 'desc')
        .limit(20);
    } else if (difficulty >= DifficultyEnum.Beginner && difficulty <= DifficultyEnum.Expert) {
      return await Database.query()
        .select('users.username', 'game_stats.win as total_win')
        .from('users')
        .innerJoin('game_stats', 'game_stats.user_id', 'users.id')
        .where('game_stats.difficulty_id', difficulty)
        .orderBy('total_win', 'desc')
        .limit(20);
    }
    response.status(404);
  }

  public async correct({ params, response }: HttpContextContract) {
    let { difficulty } = params;
    difficulty = Number(difficulty);

    if (difficulty === 0) {
      return await Database.query()
        .select('users.username', Database.raw('sum(round_stats.correct) as total_correct'))
        .from('users')
        .innerJoin('round_stats', 'round_stats.user_id', 'users.id')
        .groupBy('users.id')
        .orderBy('total_correct', 'desc')
        .limit(20);
    } else if (difficulty >= DifficultyEnum.Beginner && difficulty <= DifficultyEnum.Expert) {
      return await Database.query()
        .select('users.username', 'round_stats.correct as total_correct')
        .from('users')
        .innerJoin('round_stats', 'round_stats.user_id', 'users.id')
        .where('round_stats.difficulty_id', difficulty)
        .orderBy('total_correct', 'desc')
        .limit(20);
    }
    response.status(404);
  }
}
