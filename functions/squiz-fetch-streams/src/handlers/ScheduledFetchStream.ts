import Redis from '../core/Redis';
import TwitchStreamFetcher from '../core/TwitchStreamFetcher';
import { arraysEqual } from '../tools/array';

enum redisKeys {
  squizStreams = 'squizStreams',
}

exports.scheduledFetchStreamHandler = async () => {
  const twitch = new TwitchStreamFetcher();

  /**
   * We fetch all the current streams on sQuiz
   */
  const squizStreamsFromTwitch = await twitch.fetchSquizStreams();

  /**
   * We fetch all the streams in redis
   */
  const redisStreams = await Redis.get(redisKeys.squizStreams);
  const squizStreamsFromRedis: string[] = redisStreams === null ? [] : JSON.parse(redisStreams);

  /**
   * We update the redis cache if needed
   */
  if (!arraysEqual(squizStreamsFromRedis, squizStreamsFromTwitch)) {
    await Redis.set(redisKeys.squizStreams, JSON.stringify(squizStreamsFromTwitch));
  }
};
