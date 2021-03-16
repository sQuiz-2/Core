import redis from 'redis';
import { promisify } from 'util';

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
class Redis {
  client;

  setAsync: any;
  getAsync: any;
  publishAsync: any;

  constructor() {
    this.client = redis.createClient({
      port: Number(REDIS_PORT),
      host: REDIS_HOST,
    });
    this.client.on('error', this.onError.bind(this));
    this.setAsync = promisify(this.client.set).bind(this.client);
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.publishAsync = promisify(this.client.publish).bind(this.client);
  }

  onError(error: any) {
    console.error('Redis error:', error);
  }

  async get(key: string) {
    const result: string | null = await this.getAsync(key);
    return result;
  }

  async set(key: string, value: string) {
    const result = await this.setAsync(key, value);
    return result;
  }

  async publish(channel: string, value: string) {
    return await this.publishAsync(channel, value);
  }
}

export default new Redis();
