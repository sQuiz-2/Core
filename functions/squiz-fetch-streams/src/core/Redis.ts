import redis from 'redis';
import { promisify } from 'util';

class Redis {
  client;

  setAsync: any;
  getAsync: any;

  constructor() {
    this.client = redis.createClient({
      port: 6379,
      host: 'redis-squiz',
    });
    this.client.on('error', this.onError.bind(this));
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.getAsync = promisify(this.client.get).bind(this.client);
  }

  onError(error: any) {
    console.error('Redis error:', error);
  }

  async get(key: string) {
    const result: string | null = await this.getAsync(key);
    return result;
  }

  async set<T>(key: string, array: T) {
    const result = await this.setAsync(key, array);
    return result;
  }
}

export default new Redis();
