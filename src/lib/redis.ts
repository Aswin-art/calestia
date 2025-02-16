/* eslint-disable @typescript-eslint/no-explicit-any */
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface RedisMessage {
  role: string;
  content: string;
  model?: string;
  reasoning?: string;
  usage?: any;
}

export const redisClient = {
  async cachePrompt(key: string, data: any, ttl: number): Promise<void> {
    await redis.setex(key, ttl, JSON.stringify(data));
  },

  async getCached<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? (JSON.parse(data as string) as T) : null;
  },

  async storeMessage(
    userId: string,
    conversationId: string,
    message: RedisMessage,
  ): Promise<void> {
    try {
      if (!userId || !conversationId) return;

      const key = `history:${userId}:${conversationId}`;
      await redis.rpush(key, JSON.stringify(message));
      await redis.expire(key, 604800);
      await redis.sadd(`conversations:${userId}`, conversationId);
    } catch (error) {
      console.error("Redis Error:", error);
    }
  },

  async getHistory(userId: string, conversationId: string): Promise<any[]> {
    try {
      const key = `history:${userId}:${conversationId}`;
      const data = await redis.lrange(key, 0, -1);

      return data;
    } catch (error) {
      console.error("Redis Error:", error);
      return [];
    }
  },

  async getUserConversations(userId: string): Promise<string[]> {
    try {
      return await redis.smembers(`conversations:${userId}`);
    } catch (error) {
      console.error("Redis Error:", error);
      return [];
    }
  },
};
