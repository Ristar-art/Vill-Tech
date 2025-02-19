import { writable } from 'svelte/store';

// Custom Redis-like store
export function createRedisStore() {
    // Internal storage for key-value pairs
    const storage = new Map();
    // Internal storage for expiration times
    const expirations = new Map();
    // Internal pub/sub channels
    const channels = new Map();

    const { subscribe, set, update } = writable(storage);

    return {
        subscribe,

        // Set a key-value pair (similar to Redis SET)
        set(key, value, ttl = null) {
            storage.set(key, value);
            if (ttl) {
                const expireTime = Date.now() + ttl * 1000; // TTL in seconds
                expirations.set(key, expireTime);
                // Clean up expired keys
                setTimeout(() => {
                    if (Date.now() >= expireTime) {
                        storage.delete(key);
                        expirations.delete(key);
                        update(() => storage);
                    }
                }, ttl * 1000);
            }
            update(() => storage);
        },

        // Get a value by key (similar to Redis GET)
        get(key) {
            const expireTime = expirations.get(key);
            if (expireTime && Date.now() >= expireTime) {
                storage.delete(key);
                expirations.delete(key);
                update(() => storage);
                return undefined;
            }
            return storage.get(key);
        },

        // Delete a key (similar to Redis DEL)
        del(key) {
            storage.delete(key);
            expirations.delete(key);
            update(() => storage);
        },

        // Publish a message to a channel (similar to Redis PUBLISH)
        publish(channel, message) {
            const subscribers = channels.get(channel) || [];
            subscribers.forEach((callback) => callback(message));
        },

        // Subscribe to a channel (similar to Redis SUBSCRIBE)
        subscribeChannel(channel, callback) {
            if (!channels.has(channel)) {
                channels.set(channel, []);
            }
            channels.get(channel).push(callback);
            // Return unsubscribe function
            return () => {
                const subscribers = channels.get(channel).filter((cb) => cb !== callback);
                if (subscribers.length === 0) {
                    channels.delete(channel);
                } else {
                    channels.set(channel, subscribers);
                }
            };
        },

        // Clear all keys (similar to Redis FLUSHDB)
        flush() {
            storage.clear();
            expirations.clear();
            update(() => storage);
        }
    };
}