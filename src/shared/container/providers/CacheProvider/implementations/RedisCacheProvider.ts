import Redis, { Redis as RedisClient } from 'ioredis';

import { ICacheProvider } from '../models/ICacheProdiver';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis('redis://:@68.183.135.71:6379/');
  }

  invalidate(key: string): Promise<void> {
    throw new Error(key);
  }

  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;
    return parsedData;
  }

  async invalidatePrefix(prefix: string): Promise<void> {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach(key => pipeline.del(key));

    await pipeline.exec();
  }
}
