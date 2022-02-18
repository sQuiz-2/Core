import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import { DifficultyEnum } from '@squiz/shared';
import User from 'App/Models/User';
import Cache, { CacheKeys, correctAnswerCacheKeys, winCacheKeys } from 'App/Utils/Cache';

export default class ScoreboardsController {
  public async experience() {
    const cachedValue = Cache.get(CacheKeys.PodiumExperience);

    if (!cachedValue || cachedValue.isExpired) {
      const topExperience = await User.query()
        .select('id', 'username', 'experience')
        .orderBy('experience', 'desc')
        .limit(20);
      Cache.set(CacheKeys.PodiumExperience, topExperience);
      return topExperience;
    } else {
      return cachedValue.value;
    }
  }

  public async win({ params, response }: HttpContextContract) {
    let { difficulty } = params;
    difficulty = Number(difficulty);

    const cacheKey: CacheKeys = winCacheKeys[difficulty];
    const cachedValue = Cache.get(cacheKey);

    if (!cachedValue || cachedValue.isExpired) {
      let topWin: any[];
      if (difficulty === 0) {
        topWin = await Database.query()
          .select('users.id', 'users.username', Database.raw('sum(game_stats.win) as total_win'))
          .from('users')
          .innerJoin('game_stats', 'game_stats.user_id', 'users.id')
          .groupBy('users.id')
          .orderBy('total_win', 'desc')
          .limit(20);
      } else if (difficulty >= DifficultyEnum.Beginner && difficulty <= DifficultyEnum.Expert) {
        topWin = await Database.query()
          .select('users.id', 'users.username', 'game_stats.win as total_win')
          .from('users')
          .innerJoin('game_stats', 'game_stats.user_id', 'users.id')
          .where('game_stats.difficulty_id', difficulty)
          .orderBy('total_win', 'desc')
          .limit(20);
      } else {
        return response.status(404);
      }
      Cache.set(cacheKey, topWin);
      return topWin;
    } else {
      return cachedValue.value;
    }
  }

  public async correct({ params, response }: HttpContextContract) {
    let { difficulty } = params;
    difficulty = Number(difficulty);

    const cacheKey: CacheKeys = correctAnswerCacheKeys[difficulty];
    const cachedValue = Cache.get(cacheKey);

    if (!cachedValue || cachedValue.isExpired) {
      let correctAnswers: any[];
      if (difficulty === 0) {
        correctAnswers = await Database.query()
          .select(
            'users.id',
            'users.username',
            Database.raw('sum(round_stats.correct) as total_correct'),
          )
          .from('users')
          .innerJoin('round_stats', 'round_stats.user_id', 'users.id')
          .groupBy('users.id')
          .orderBy('total_correct', 'desc')
          .limit(20);
      } else if (difficulty >= DifficultyEnum.Beginner && difficulty <= DifficultyEnum.Expert) {
        correctAnswers = await Database.query()
          .select('users.id', 'users.username', 'round_stats.correct as total_correct')
          .from('users')
          .innerJoin('round_stats', 'round_stats.user_id', 'users.id')
          .where('round_stats.difficulty_id', difficulty)
          .orderBy('total_correct', 'desc')
          .limit(20);
      } else {
        return response.status(404);
      }
      Cache.set(cacheKey, correctAnswers);
      return correctAnswers;
    } else {
      return cachedValue.value;
    }
  }
}
