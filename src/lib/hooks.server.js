// src/hooks.server.js
import { rateLimit } from '$lib/server/rateLimit';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // Skip rate limiting for non-authentication routes
    if (!event.url.pathname.startsWith('/auth')) {
        return resolve(event);
    }

    const ip = event.getClientAddress();

    // Apply stricter limits for authentication routes
    const result = await rateLimit({
        ip,
        limit: 5, // 5 attempts
        windowMs: 15 * 60 * 1000 // 15 minutes
    });

    if (result.isLimited) {
        return new Response('Too many requests. Please try again later.', {
            status: 429,
            headers: {
                'Retry-After': Math.ceil((result.resetTime - Date.now()) / 1000).toString(),
                'X-RateLimit-Limit': '5',
                'X-RateLimit-Remaining': result.remaining.toString(),
                'X-RateLimit-Reset': Math.ceil(result.resetTime / 1000).toString()
            }
        });
    }

    // Add rate limit headers to all responses
    const response = await resolve(event);
    const headers = new Headers(response.headers);

    headers.set('X-RateLimit-Limit', '5');
    headers.set('X-RateLimit-Remaining', result.remaining.toString());
    headers.set('X-RateLimit-Reset', Math.ceil(result.resetTime / 1000).toString());

    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers
    });
}