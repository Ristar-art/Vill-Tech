// src/routes/courses/[details]/+page.server.js
import { error } from '@sveltejs/kit';
import { moodleClient } from '$lib/moodle';

export const ssr = true;
export const csr = true;
export const prerender = false;

export async function load({ params }) {
    try {
        const courseId = parseInt(params.details);

        if (isNaN(courseId)) {
            throw error(400, 'Invalid course ID');
        }

        // Fetch course first to verify it exists
        const allCourses = await moodleClient.getCourses();
        const course = allCourses.find(c => c.id === courseId);

        if (!course) {
            throw error(404, `Course with ID ${courseId} not found`);
        }

        // Initialize variables
        let courseByField = [];
        let courseContents = [];
        let courseCompetencies = [];

        // Fetch initial data with fallback
        try {
            [courseByField, courseContents, courseCompetencies] = await Promise.all([
                moodleClient.getCourseByField('id', courseId.toString()),
                moodleClient.getCourseContents(courseId),
                moodleClient.getCourseCompetencies(courseId)
            ]);
        } catch (err) {
            console.error('Failed to fetch one or more course data:', err);
            // You can choose to handle specific cases here if needed
        }

        return {
            course,
            courseByField,
            courseContents,
            courseCompetencies,
            streamed: {
                // Allows potential refetching or additional data loading
                courseByField: moodleClient.getCourseByField('id', courseId.toString()).catch(() => []),
                courseContents: moodleClient.getCourseContents(courseId).catch(() => []),
                courseCompetencies: moodleClient.getCourseCompetencies(courseId).catch(() => [])
            }
        };
    } catch (e) {
        console.error('Failed to fetch course data:', e);
        if (e.status) throw e;
        throw error(500, 'Failed to load course data');
    }
}