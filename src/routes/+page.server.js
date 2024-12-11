import { moodleClient } from '$lib/moodle';
import { error } from '@sveltejs/kit';
import { getCachedData, setCachedData } from '$lib/server/redis';

export async function load({ url }) {
    const limit = parseInt(url.searchParams.get('limit')) || 6;
    const page = parseInt(url.searchParams.get('page')) || 1;

    try {
        const cacheKey = `moodle:courses`;
        let allCourses = await getCachedData(cacheKey);

        if (!allCourses) {
            allCourses = await moodleClient.getCourses();
            await setCachedData(cacheKey, JSON.stringify(allCourses), { EX: 60 * 60 }); // Cache for 1 hour
        } else {
            allCourses = JSON.parse(allCourses);
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
            totalPages: Math.ceil(totalCourses / limit)
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