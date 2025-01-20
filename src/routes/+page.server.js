import { moodleClient } from '$lib/moodle';
import { error } from '@sveltejs/kit';

// In-memory cache
const cache = new Map();

export async function load({ url }) {
    const limit = parseInt(url.searchParams.get('limit')) || 6;
    const page = parseInt(url.searchParams.get('page')) || 1;

    try {
        const cacheKey = `moodle:courses`;
        let allCourses = cache.get(cacheKey);

        if (!allCourses) {
            allCourses = await moodleClient.getCourses();
            cache.set(cacheKey, allCourses);
            setTimeout(() => cache.delete(cacheKey), 60 * 60 * 1000); // Cache for 1 hour
        }

        if (!Array.isArray(allCourses)) {
            console.error('Unexpected response format:', allCourses);
            throw error(500, 'Unexpected response format from Moodle API');
        }

        const totalCourses = allCourses.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedCourses = allCourses.slice(startIndex, endIndex);

        return {
            courses: paginatedCourses,
            totalCourses,
            limit,
            page,
            totalPages: Math.ceil(totalCourses / limit),
            form: {} // Added form property
        };
    } catch (e) {
        console.error('Failed to fetch Moodle courses:', e);
        if (e.status && e.body) {
            throw e;
        }
        throw error(500, {
            message: 'Failed to fetch courses',
            cause: e
        });
    }
}