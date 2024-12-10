// // src/routes/+page.js
// import { moodleClient } from '$lib/moodle';
// import { error } from '@sveltejs/kit';
// import { Redis } from '@upstash/redis';
// import { UPSTASH_REDIS_URL, UPSTASH_REDIS_TOKEN } from '$env/static/private';

// let redis;
// try {
//     if (UPSTASH_REDIS_URL && UPSTASH_REDIS_TOKEN) {
//         redis = new Redis({
//             url: UPSTASH_REDIS_URL,
//             token: UPSTASH_REDIS_TOKEN,
//         });
//     }
// } catch (error) {
//     console.warn('Redis connection failed, falling back to no cache');
// }

// export async function load({ url }) {
//     const limit = parseInt(url.searchParams.get('limit')) || 6;
//     const page = parseInt(url.searchParams.get('page')) || 1;

//     try {
//         const cacheKey = `moodle:courses`;
//         let allCourses = await redis?.get(cacheKey);

//         if (!allCourses) {
//             allCourses = await moodleClient.getCourses();
//             await redis?.set(cacheKey, JSON.stringify(allCourses), { ex: 60 * 60 }); // Cache for 1 hour
//         } else {
//             allCourses = JSON.parse(allCourses);
//         }

//         if (!Array.isArray(allCourses)) {
//             console.error('Unexpected response format:', allCourses);
//             throw error(500, 'Unexpected response format from Moodle API');
//         }

//         const totalCourses = allCourses.length;
//         const startIndex = (page - 1) * limit;
//         const endIndex = startIndex + limit;
//         const paginatedCourses = allCourses.slice(startIndex, endIndex);

//         return {
//             courses: paginatedCourses,
//             totalCourses,
//             limit,
//             page,
//             totalPages: Math.ceil(totalCourses / limit)
//         };
//     } catch (e) {
//         console.error('Failed to fetch Moodle courses:', e);
//         if (e.status && e.body) {
//             throw e;
//         }
//         throw error(500, {
//             message: 'Failed to fetch courses',
//             cause: e
//         });
//     }
// }