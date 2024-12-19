// src/routes/courses/[details]/+page.server.js
import { error } from '@sveltejs/kit';
import { moodleClient } from '$lib/moodle';
import { getCachedData, setCachedData } from '$lib/server/redis';

export const ssr = true;
export const csr = true;
export const prerender = false;

export async function load({ params }) {
    try {
        const courseId = parseInt(params.details);

        if (isNaN(courseId)) {
            throw error(400, 'Invalid course ID');
        }

        const cacheKey = `moodle:course:${courseId}`;
        let cachedCourseData = await getCachedData(cacheKey);

        if (cachedCourseData) {
            let { course, courseByField, courseContents, courseCompetencies } = JSON.parse(cachedCourseData);
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

        const allCourses = await moodleClient.getCourses();
        const course = allCourses.find(c => c.id === courseId);

        if (!course) {
            throw error(404, `Course with ID ${courseId} not found`);
        }

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

        const cacheData = JSON.stringify({ course, courseByField, courseContents, courseCompetencies });
        await setCachedData(cacheKey, cacheData, { ex: 60 * 60 });

        return {
            course,
            courseByField,
            courseContents,
            courseCompetencies,
            streamed: {
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