import { moodleClient } from '$lib/moodle';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
    try {
        const courseId = params.details;
        const [course, courseContents] = await Promise.all([
            moodleClient.getCourses().then(courses => courses.find(c => c.id == courseId)),
            moodleClient.getCourseContents(courseId)
        ]);

        if (!course) {
            throw error(404, 'Course not found');
        }

        // Fetch the first module as an example
        let firstModule = null;
        if (courseContents.length > 0 && courseContents[0].modules.length > 0) {
            const firstModuleId = courseContents[0].modules[0].id;
            firstModule = await moodleClient.getCourseModule(firstModuleId);
        }

        return {
            course,
            courseContents,
            firstModule
        };
    } catch (e) {
        console.error('Error loading course data:', e);
        throw error(500, 'Failed to load course data');
    }
}
