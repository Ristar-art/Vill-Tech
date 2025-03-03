// src/lib/server/rateLimit.js
import { Redis } from '@upstash/redis';

let redis;
try {
    redis = new Redis({
        url: process.env.VITE_REDIS_URL,        
    });

    redis.on('error', (error) => {
        console.error('Redis Client Error:', error);
    });
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
