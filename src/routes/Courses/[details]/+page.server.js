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
        const [courseContents, blocksData, courseCompetencies] = await Promise.all([
            moodleClient.getCourseContents(courseId).catch(err => {
                console.error('Failed to fetch course contents:', err);
                return [];
            }),
            moodleClient.getCourseBlocks(courseId).catch(err => {
                console.error('Failed to fetch blocks:', err);
                return { blocks: [], totalBlocks: 0, visibleBlocksCount: 0 };
            }),
            moodleClient.getCourseCompetencies(courseId).catch(err => {
                console.error('Failed to fetch competencies:', err);
                return [];
            })
        ]);

        // Only fetch frameworks if we successfully got competencies
        // let frameworks = [];
        // if (courseCompetencies && courseCompetencies.length > 0) {
        //     frameworks = await moodleClient.getCompetencyFrameworks().catch(err => {
        //         console.error('Failed to fetch frameworks:', err);
        //         return [];
        //     });
        // }

        // console.log(' courseCompetencies: ', courseCompetencies);
        // console.log(`Found ${blocksData.visibleBlocksCount} visible blocks out of ${blocksData.totalBlocks} total blocks`);

        return {
            course,
            courseContents,
            // courseBlocks: blocksData.blocks,
            courseCompetencies,
            // frameworks
        };
    } catch (e) {
        console.error('Failed to fetch course data:', e);
        if (e.status) throw e;
        throw error(500, 'Failed to load course data');
    }
}