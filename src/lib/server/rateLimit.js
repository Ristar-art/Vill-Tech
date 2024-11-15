// src/lib/server/rateLimit.js
import { Redis } from '@upstash/redis';
import { UPSTASH_REDIS_URL, UPSTASH_REDIS_TOKEN } from '$env/static/private';

// Initialize Redis client if credentials are available
let redis;
try {
    if (UPSTASH_REDIS_URL && UPSTASH_REDIS_TOKEN) {
        // For local Redis instance
        
        redis = new Redis({
            url: UPSTASH_REDIS_URL,
            // token: UPSTASH_REDIS_TOKEN,
        });
        // For cloud-based Redis instance
        // const client = redis.createClient({
        //     url: 'redis://:<password>@your-instance-name.redis.cache.windows.net:6379'
        // });
    }
} catch (error) {
    console.warn('Redis connection failed, falling back to in-memory store');
}

// Fallback in-memory store
const inMemoryStore = new Map();

// Clean up expired in-memory records every hour
setInterval(() => {
    const now = Date.now();
    for (const [key, value] of inMemoryStore.entries()) {
        if (value.resetTime < now) {
            inMemoryStore.delete(key);
        }
    }
}, 60 * 60 * 1000);

export async function rateLimit({ ip, limit = 5, windowMs = 15 * 60 * 1000 }) {
    const key = `ratelimit:${ip}`;
    const now = Date.now();

    if (redis) {
        // Use Redis for distributed rate limiting
        try {
            const multi = redis.multi();
            multi.incr(key);
            multi.pexpire(key, windowMs);
            const [current] = await multi.exec();

            if (current === 1) {
                await redis.pexpire(key, windowMs);
            }

            return {
                isLimited: current > limit,
                remaining: Math.max(0, limit - current),
                resetTime: now + windowMs
            };
        } catch (error) {
            console.error('Redis error:', error);
            // Fallback to in-memory if Redis fails
        }
    }

    // In-memory rate limiting fallback
    let record = inMemoryStore.get(key);
    const resetTime = now + windowMs;

    if (!record || record.resetTime < now) {
        record = {
            count: 1,
            resetTime
        };
        inMemoryStore.set(key, record);
    } else {
        record.count += 1;
    }

    return {
        isLimited: record.count > limit,
        remaining: Math.max(0, limit - record.count),
        resetTime: record.resetTime
    };
}
