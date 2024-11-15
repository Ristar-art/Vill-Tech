// src/routes/courses/[details]/+page.server.js
import { error } from '@sveltejs/kit';
import { moodleClient } from '$lib/moodle';

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

        // Fetch other data with proper error handling
        const [courseContents, courseCompetencies] = await Promise.all([
            moodleClient.getCourseContents(courseId).catch(err => {
                console.error('Failed to fetch course contents:', err);
                return [];
            }),
          
            moodleClient.getCourseCompetencies(courseId).catch(err => {
                console.error('Failed to fetch competencies:', err);
                return []; // Ensure this returns an array
            })
        ]);

        // Ensure courseCompetencies is an array
        if (!Array.isArray(courseCompetencies)) {
            courseCompetencies = [];
        }

        return {
            course,
            courseContents,           
            courseCompetencies,
        };
    } catch (e) {
        console.error('Failed to fetch course data:', e);
        if (e.status) throw e;
        throw error(500, 'Failed to load course data');
    }
}