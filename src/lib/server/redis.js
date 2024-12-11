import { createClient } from 'redis';

let redis;

try {
    redis = createClient({
        url: process.env.UPSTASH_REDIS_URL
    });

    redis.on('error', (error) => {
        console.error('Redis Client Error:', error);
    });

    await redis.connect();
    console.log('Redis connected successfully');
} catch (error) {
    console.warn('Redis connection failed:', error.message);
    redis = null;
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