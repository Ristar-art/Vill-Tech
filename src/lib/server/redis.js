// src/lib/server/redis.js
import { Redis } from '@upstash/redis';
import { UPSTASH_REDIS_URL, UPSTASH_REDIS_TOKEN } from '$env/static/private';

let redis;
try {
    if (UPSTASH_REDIS_URL && UPSTASH_REDIS_TOKEN) {
        redis = new Redis({
            url: UPSTASH_REDIS_URL,
            token: UPSTASH_REDIS_TOKEN,
        });
    }
} catch (error) {
    console.warn('Redis connection failed, falling back to no cache');
}

export async function getCachedData(key) {
    return redis ? await redis.get(key) : null;
}

export async function setCachedData(key, value, options = {}) {
    return redis ? await redis.set(key, value, options) : null;
}

export async function invalidateCache(key) {
    return redis ? await redis.del(key) : null;
}