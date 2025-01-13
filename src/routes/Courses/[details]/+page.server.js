// src/routes/courses/[details]/+page.server.js
import { error } from '@sveltejs/kit';
import { moodleClient } from '$lib/moodle';

export const ssr = true;
export const csr = true;
export const prerender = false;

// In-memory cache
const cache = new Map();

export async function load({ params }) {
    try {
        const courseId = parseInt(params.details);

        if (isNaN(courseId)) {
            throw error(400, 'Invalid course ID');
        }

        const cacheKey = `moodle:course:${courseId}`;
        let cachedCourseData = cache.get(cacheKey);

        if (cachedCourseData) {
            // If cached data exists, return it
            const { course, courseByField, courseContents, courseCompetencies } = cachedCourseData;
            return {
                course,
                courseByField,
                courseContents,
                courseCompetencies,
                streamed: {
                    courseByField: Promise.resolve(courseByField),
                    courseContents: Promise.resolve(courseContents),
                    courseCompetencies: Promise.resolve(courseCompetencies)
                }
            };
        }

        // Fetch all courses to find the specific course
        const allCourses = await moodleClient.getCourses();
        const course = allCourses.find(c => c.id === courseId);

        if (!course) {
            throw error(404, `Course with ID ${courseId} not found`);
        }

        // Fetch additional course data
        let courseByField = [];
        let courseContents = [];
        let courseCompetencies = [];

        try {
            [courseByField, courseContents, courseCompetencies] = await Promise.all([
                moodleClient.getCourseByField('id', courseId.toString()),
                moodleClient.getCourseContents(courseId),
                moodleClient.getCourseCompetencies(courseId)
            ]);
        } catch (err) {
            console.error('Failed to fetch one or more course data:', err);
        }

        // Cache the data in memory
        const cacheData = { course, courseByField, courseContents, courseCompetencies };
        cache.set(cacheKey, cacheData);

        // Set a timeout to clear the cache after 1 hour
        setTimeout(() => cache.delete(cacheKey), 60 * 60 * 1000); // Cache for 1 hour

        return {
            course,
            courseByField,
            courseContents,
            courseCompetencies,
            streamed: {
                courseByField: Promise.resolve(courseByField),
                courseContents: Promise.resolve(courseContents),
                courseCompetencies: Promise.resolve(courseCompetencies)
            }
        };
    } catch (e) {
        console.error('Failed to fetch course data:', e);
        if (e.status) throw e;
        throw error(500, 'Failed to load course data');
    }
}