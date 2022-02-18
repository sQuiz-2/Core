import { DifficultyEnum } from '@squiz/shared';

export const SECOND = 1000;
export const MINUTE = SECOND * 60;
export const HOUR = SECOND * 60;

export enum CacheKeys {
  PodiumWinAll = 'PodiumWinAll',
  PodiumWinEasy = 'PodiumWinEasy',
  PodiumWinConfirmed = 'PodiumWinConfirmed',
  PodiumWinExpert = 'PodiumWinExpert',
  PodiumCorrectAnswerAll = 'PodiumCorrectAnswerAll',
  PodiumCorrectAnswerEasy = 'PodiumCorrectAnswerEasy',
  PodiumCorrectAnswerConfirmed = 'PodiumCorrectAnswerConfirmed',
  PodiumCorrectAnswerExpert = 'PodiumCorrectAnswerExpert',
  PodiumExperience = 'PodiumExperience',
}

type cacheElem = {
  ttl: number;
  lastUpdate: number;
  value: any;
};

class Cache {
  cached: { [k: string]: cacheElem } = {};

  get(key: CacheKeys) {
    const cachedElem = this.cached[key];
    if (!cachedElem) return undefined;
    const isExpired = Date.now() > cachedElem.ttl + cachedElem.lastUpdate;
    if (cachedElem && !isExpired) {
      return { value: cachedElem.value, isExpired: false };
    } else if (cachedElem && isExpired) {
      return { value: cachedElem.value, isExpired: true };
    }
    return undefined;
  }

  set(key: CacheKeys, value: any, ttl: number = MINUTE * 30) {
    this.cached[key] = {
      ttl,
      value,
      lastUpdate: Date.now(),
    };
  }
}

export default new Cache();

export const winCacheKeys = {
  0: CacheKeys.PodiumWinAll,
  [DifficultyEnum.Beginner]: CacheKeys.PodiumWinEasy,
  [DifficultyEnum.Intermediate]: CacheKeys.PodiumWinConfirmed,
  [DifficultyEnum.Expert]: CacheKeys.PodiumWinExpert,
};

export const correctAnswerCacheKeys = {
  0: CacheKeys.PodiumCorrectAnswerAll,
  [DifficultyEnum.Beginner]: CacheKeys.PodiumCorrectAnswerEasy,
  [DifficultyEnum.Intermediate]: CacheKeys.PodiumCorrectAnswerConfirmed,
  [DifficultyEnum.Expert]: CacheKeys.PodiumCorrectAnswerExpert,
};
