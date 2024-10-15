import { moodleClient } from '$lib/moodle';
import { error } from '@sveltejs/kit';

export async function load({ url }) {
    const limit = parseInt(url.searchParams.get('limit')) || 6;
    const page = parseInt(url.searchParams.get('page')) || 1;

    try {
        const allCourses = await moodleClient.getCourses();

        // Ensure allCourses is an array
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
        
        // If it's already a SvelteKit error, throw it directly
        if (e.status && e.body) {
            throw e;
        }
        
        // Otherwise, create a new error
        throw error(500, {
            message: 'Failed to fetch courses',
            cause: e
        });
    }
}